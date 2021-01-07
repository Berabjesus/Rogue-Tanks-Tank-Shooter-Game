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
    this._world = world
    this._playerBody = world.playerTankContainer
    this._mainScene = mainScene
    this._mainScene.scene.add.existing(this);
    this._mainScene.scene.physics.world.enable(this);

    this.setScale(0.3,0.3)
    this.body.setSize(170, 220)
    this._turret = new TankTools(this._mainScene,0,0, 'enemyTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7);
    this._ammo = 20
    this._enemyContact = false
    this._chasePlayer = false
  }

  follow(pathSetting) {
    this.startFollow(pathSetting)
    this._world.physics.add.collider(this, this._world.buildings)
    this._world.physics.add.collider(this, this._playerBody)
    this._world.physics.add.collider(this._playerBody, this)
  }

  _attachTurret(){
    this._turret.x = this.x
    this._turret.y = this.y
  }

  _rotateTurret(){
    let angel = Phaser.Math.Angle.Between(this.body.x,this.body.y, this._playerBody.x, this._playerBody.y);
    this._turret.rotation = angel + Math.PI/2
  }

  _explodeBullet(bullet) {
    this._world.explode(bullet.x, bullet.y)
    bullet.destroy(true)
  }

  _updatePlayerStatus(){
    this._playerBody.health -= 10
    if (this._playerBody.health <= 0) {
      this._playerBody.destroy(true)
    }
  }

  _attackPlayer(){
    let newBullet = this._world.physics.add.sprite(this.x,this.y, 'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30).setOffset(65, 50);
    
    newBullet.rotation = this._turret.rotation
    this._world.physics.add.collider(newBullet, this._world.buildings, this._explodeBullet.bind(this), null, this)

    this._world.physics.add.collider(newBullet, this._playerBody, function() {
      this._explodeBullet(newBullet)
      this._updatePlayerStatus()
    }, null, this);

    this._world.physics.moveTo(newBullet, this._playerBody.x,this._playerBody.y,900);
  }

  _followPlayer() {
    this.startFollow(this._playerBody)
    this.pathRotationOffset = 90
    let dx = this._playerBody.x - this.x
    let dy = this._playerBody.y - this.y
    let angle = Math.atan2(dy,dx)
    let chaseSpeed = 200
    this.body.setVelocity( Math.cos(angle) * chaseSpeed,
    Math.sin(angle) * chaseSpeed);

    let rotation = Phaser.Math.Angle.Between(this.x, this.y, this._playerBody.x, this._playerBody.y);
    this.rotation = rotation + Math.PI/2
  }

  _playerInRange(){
    return Phaser.Math.Distance.BetweenPoints(this, this._playerBody)
  }

  update(){
    this._attachTurret()

    if (this._playerInRange() < 400) {
      !this._enemyContact ? this._enemyContact = true :

      this._rotateTurret()

      if (this._playerInRange() <= 100) {
        this.stopFollow()
        this._chasePlayer = false
      }else if(this._playerInRange() > 200) {
        this._chasePlayer = true
      }

      if (this._chasePlayer) {
        this._followPlayer()
      }

      if (this._ammo  === 20) {
        this._attackPlayer()
        this._ammo  = 0
      }else{
        this._ammo  += 1
      }
    } else if(this._enemyContact) {
      this.stopFollow()
    }
  }
}

