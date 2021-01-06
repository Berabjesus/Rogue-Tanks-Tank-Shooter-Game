import 'phaser'

export default class Enemy extends Phaser.GameObjects.PathFollower {
  constructor(mainScene,path, x, y){
    super(mainScene.scene,path, x, y, 'enemy')
    mainScene.scene.add.existing(this);
    mainScene.scene.physics.world.enable(this);
    this.setScale(0.3,0.3)
    this.body.setSize(170, 220)
  }
  follow(pathSetting) {
    this.startFollow(pathSetting)
  }
}

class EnemyTankTurret extends Phaser.Physics.Arcade.Sprite {
  constructor(){
    super()
  }
}