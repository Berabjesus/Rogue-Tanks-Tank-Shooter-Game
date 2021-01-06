import 'phaser'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'bullet')
  }

  fire (x, y,directionX, directionY){

  } 

  preUpdate (time, delta){
      super.preUpdate(time, delta);
  }
}

export default class Enemys extends Phaser.Physics.Arcade.Group {
  constructor(scene){
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 1,
      key: 'enemy',
      active: false,
      visible: false,
      classType: Enemy
    })
  }
  fireBullet (x, y, directionX, directionY){
      let bullet = this.getFirstDead(true);
      if (bullet){
          bullet.fire(x, y,directionX, directionY);
      }
  }
}