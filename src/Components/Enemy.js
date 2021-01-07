import 'phaser' 

class TankTools extends Phaser.Physics.Arcade.Sprite {
  constructor(mainScene,x,y,texture){
    super(mainScene.scene,x,y,texture)
    mainScene.scene.add.existing(this);
  }
}

export default class Enemy extends Phaser.GameObjects.PathFollower {
  constructor(world, mainScene,path){
    super(mainScene.scene,path, path.points.x, path.points.y, 'enemy')
    this.playerBody = world.playerTankContainer
    this.mainScene = mainScene
    this.mainScene.scene.add.existing(this);
    this.mainScene.scene.physics.world.enable(this);

    this.world = world
    this.setScale(0.3,0.3)
    this.body.setSize(170, 220)
    this.turret = new TankTools(this.mainScene,0,0, 'enemyTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7);
    this.bullet = new TankTools(mainScene,0,0, 'bullet')
    this.ammo = 20
    this.enemyContact = false
    this.chasePlayer = false
  }

  follow(pathSetting) {
    this.startFollow(pathSetting)
    this.world.physics.add.collider(this, this.world.buildings)
    this.world.physics.add.collider(this, this.playerBody)
    this.world.physics.add.collider(this.playerBody, this)
  }

  _attachTurret(){
    this.turret.x = this.x
    this.turret.y = this.y
  }

  _rotateTurret(){
    let angel = Phaser.Math.Angle.Between(this.body.x,this.body.y, this.playerBody.x, this.playerBody.y);
    this.turret.rotation = angel + Math.PI/2
  }

  _explodeBullet(bullet) {
    this.world.explode(bullet.x, bullet.y)
    bullet.destroy(true)
  }

  _updatePlayerStatus(){
    this.playerBody.health -= 10
    if (this.playerBody.health <= 0) {
      this.playerBody.destroy(true)
    }
  }

  attackPlayer(){
    let newBullet = this.world.physics.add.sprite(this.x,this.y, 'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30).setOffset(65, 50);
    
    newBullet.rotation = this.turret.rotation
    this.world.physics.add.collider(newBullet, this.world.buildings, this._explodeBullet.bind(this), null, this)

    this.world.physics.add.collider(newBullet, this.playerBody, function() {
      this._explodeBullet(newBullet)
      this._updatePlayerStatus()
    }, null, this);

    this.world.physics.moveTo(newBullet, this.playerBody.x,this.playerBody.y,900);
  }

  _followPlayer() {
    this.startFollow(this.playerBody)
    this.pathRotationOffset = 90
    let dx = this.playerBody.x - this.x
    let dy = this.playerBody.y - this.y
    let angle = Math.atan2(dy,dx)
    let chaseSpeed = 200
    this.body.setVelocity( Math.cos(angle) * chaseSpeed,
    Math.sin(angle) * chaseSpeed);

    let rotation = Phaser.Math.Angle.Between(this.x, this.y, this.playerBody.x, this.playerBody.y);
    this.rotation = rotation + Math.PI/2
  }

  _playerInRange(){
    return Phaser.Math.Distance.BetweenPoints(this, this.playerBody)
  }

  update(){
    this._attachTurret()

    if (this._playerInRange() < 400) {
      !this.enemyContact ? this.enemyContact = true :

      this._rotateTurret()

      if (this._playerInRange() <= 100) {
        this.stopFollow()
        this.chasePlayer = false
      }else if(this._playerInRange() > 200) {
        this.chasePlayer = true
      }

      if (this.chasePlayer) {
        this._followPlayer()
      }

      if (this.ammo === 20) {
        this.attackPlayer()
        this.ammo = 0
      }else{
        this.ammo += 1
      }
    } else if(this.enemyContact) {
      this.stopFollow()
    }
  }
}

