import 'phaser'

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'enemy')
  }

  spawn() {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
  }

}

export default class Enemies extends Phaser.Physics.Arcade.Group {
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
  create (x, y){
      // let bullet = this.getFirstDead(true);
      // if (bullet){
      //     bullet.fire(x, y,directionX, directionY);
      // }
     let enemy = new Enemy()
     enemy.spawn(x,y)
  }
}