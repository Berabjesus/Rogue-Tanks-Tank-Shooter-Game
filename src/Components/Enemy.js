import 'phaser' 

class TankTools extends Phaser.Physics.Arcade.Sprite {
  constructor(mainScene,x,y,texture){
    super(mainScene.scene,x,y,texture)
    mainScene.scene.add.existing(this);
    mainScene.scene.physics.world.enable(this);
  }
}

export default class Enemy extends Phaser.GameObjects.PathFollower {
  constructor(world, mainScene,path){
    super(mainScene.scene,path, path.points.x, path.points.y, 'enemy')
    this.playerToAttack = world.playerTankContainer
    this.mainScene = mainScene
    this.mainScene.scene.add.existing(this);
    this.mainScene.scene.physics.world.enable(this);

    this.world = world
    this.setScale(0.3,0.3)
    this.body.setSize(170, 220)
    this.turret = new TankTools(this.mainScene,0,0, 'enemyTankBarrel')
    this.turret.setScale(0.3,0.3).setOrigin(0.5, 0.7);
    // this.bullet = new TankTools(mainScene,0,0, 'bullet')
    this.ammo = 30
  }

  follow(pathSetting) {
    this.startFollow(pathSetting)
  }

  attachTurret(){
    this.turret.x = this.x
    this.turret.y = this.y
  }

  rotateTurret(){
    let angel = Phaser.Math.Angle.Between(this.body.x,this.body.y, this.playerToAttack.x, this.playerToAttack.y);
    this.turret.rotation = angel + Math.PI/2
  }

  attackPlayer(){
    this.newbullet = new TankTools(this.mainScene,this.x,this.y, 'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30).setOffset(65, 50);
    this.newbullet.rotation = this.turret.rotation
    this.world.physics.moveTo(this.newbullet, this.playerToAttack.x,this.playerToAttack.y,900);
    this.world.physics.add.collider(this.newbullet, this.world.walls, function() {
      this.world.explode(this.newbullet.x, this.newbullet.y)
      this.newbullet.destroy(true)
    }.bind(this), null, this)

    this.world.physics.add.collider(this.newbullet, this.playerToAttack, function() {
      console.log(this.playerToAttack.health);
      this.world.explode(this.newbullet.x, this.newbullet.y)
      this.newbullet.destroy(true)
      console.log(this.newbullet);
      this.playerToAttack.health -= 10
      if (this.playerToAttack.health <= 0) {
        this.playerToAttack.destroy(true)
      }
    }, null, this);
  }

  update(){
    this.attachTurret()
    this.rotateTurret()
    if (this.ammo === 30) {
      this.attackPlayer()
      this.ammo = 0
    }else{
      this.ammo += 1
    }
  }
}

