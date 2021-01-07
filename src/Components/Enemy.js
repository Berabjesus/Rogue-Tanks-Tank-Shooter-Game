import 'phaser' 
import Bullet from './bullet'

class TankTools extends Phaser.Physics.Arcade.Sprite {
  constructor(mainScene,x,y,texture){
    super(mainScene.scene,x,y,texture)
    mainScene.scene.add.existing(this);
  }
}

export default class Enemy extends Phaser.GameObjects.PathFollower {
  constructor(mainScene,path, player){
    super(mainScene.scene,path, path.points.x, path.points.y, 'enemy')
    mainScene.scene.add.existing(this);
    mainScene.scene.physics.world.enable(this);
    this.setScale(0.3,0.3)
    this.body.setSize(170, 220)
    this.turret = new TankTools(mainScene,0,0, 'enemyTankBarrel')
    this.turret.setScale(0.3,0.3).setOrigin(0.5, 0.7);
    // this.bullet = new TankTools(mainScene,0,0, 'bullet')
    this.playerToAttack = player
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
    let newbullet = new TankTools(mainScene,0,0, 'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30).setOffset(65, 50);
    newbullet.rotation = this.turret.rotation
  }
}

