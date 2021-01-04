import 'phaser'

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'bullet')
  }

  fire (x, y,directionX, directionY){
      this.body.reset(x, y);
      this.setActive(true);
      this.setVisible(true);
      // this.setVelocityY(-300);
      // this.setVelocityX(300);

      // this.body.velocity.y = 0 
      // this.body.velocity.x = 0
      // directionX += 90
      // console.log('before  ' + directionX);
      // if (directionX >= 90) {
      //   directionX = -directionX
      // } else if(directionX >= -180 && directionX <= -90) {
      //   directionX = -directionX
      // }
      // // this.body.rotation += directionX
      // console.log('after  ' + directionX);

      const speed = 15
      const velocityY = Math.sin(directionX)

      // console.log('x  ' + directionX);
      // console.log('V  '  + velocityY);
      // const velocityX = Math.sin(this.body.rotation) * speed
      // this.body.velocity.y = velocityY
      // this.body.velocity.x = 1
      // this.body.velocity.x = -100
      // this.body.velocity.y = -200
      // this.body.velocity.x = 100
      // console.log(this);

      // let vec =  this.scene.physics.velocityFromRotation(directionX, 200);
      // console.log('vec x  ' +  vec.x);
      // console.log('vec y  ' +  vec.y);


      // this.body.velocity.y = vec.y
      // this.body.velocity.x = vec.x
      this.scene.physics.moveTo(this.body,directionX,directionY);
  } 

  preUpdate (time, delta){
      super.preUpdate(time, delta);
  }
}

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene){
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 1,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet
    })
  }
  fireBullet (x, y, directionX, directionY){
      let bullet = this.getFirstDead(true);
      if (bullet){
          bullet.fire(x, y,directionX, directionY);
      }
  }
}