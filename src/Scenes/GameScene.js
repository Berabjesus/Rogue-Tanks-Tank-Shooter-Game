import 'phaser';
import Bullets from '../shared/bullet'
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
  }
 
  create () {
    const map = this.make.tilemap({key: "map"})
    this.mapBaseY = map.heightInPixels;
    const tileset = map.addTilesetImage('tileset', 'tile')

    map.createLayer('Ground', tileset)
    this.walls =  map.createLayer('Wall', tileset)
    this.walls.setCollisionByProperty({ collides: true });

    /*
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.walls.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    */

    // this.cameras.main.scrollX = -80;
    // this.cameras.main.scrollY = (this.mapBaseY - this.cameras.main.height);

    this.player = this.physics.add.sprite(0, 0, 'player').setScale(0.3, 0.3)
    this.bullet = this.physics.add.sprite(500,410, 'bullet').setScale(0.7, 0.7).setOrigin(0.5, 1)
    this.bullets = new Bullets(this)

    // this.bullet = this.physics.add.sprite(0, 0, 'bullet').setScale(0.8,0.8).setOrigin(0.5, 0.7)

    this.playerTankContainer =  this.add.container(500, 400, [ this.player]);
    this.playerTankContainer.setSize(64, 64)
    this.physics.world.enable(this.playerTankContainer);

    // this.player.setCollideWorldBounds(true);
    // this.player.angle = -50

    this.playerTankBarrel = this.physics.add.sprite(100, 100, 'playerTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7)


    this.physics.add.collider(this.playerTankContainer, this.walls);
    this.physics.add.collider(this.playerTankBarrel, this.walls)
    this.camera = this.cameras.main;
    this.camera.startFollow(this.playerTankContainer);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.arrows = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      a:  Phaser.Input.Keyboard.KeyCodes.A,
      d:  Phaser.Input.Keyboard.KeyCodes.D,
      space:  Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    // setTimeout(() => {
    //   let r = Phaser.Math.Between(90, 175);
    //   console.log(r);
    //   this.tweens.add({
    //     targets: this.player,
    //     angle: r,
    //     ease: 'Power1',
    //     duration: 1000,
    //     delay: 1000
    //   });
    // }, 2000);
    // setInterval(() => {
    //   console.log(this.playerTankBarrel.body.rotation);
    // }, 2000);
    // this.input.on('pointermove', function(pointer) {
      // this.target = Phaser.Math.Angle.BetweenPoints(this.playerTankContainer.body, pointer);
    //   console.log(this.target);
    // }.bind(this))

    // setInterval(function() {
    //   console.log(this.rotate);
    //   console.log(this.playerTankBarrel.rotation);
    // }.bind(this), 3000); 

    // setInterval(() => {
    //   // this.playerTankBarrel.angle.x += 1
    //   // this.playerTankBarrel.angle.y += 1
    // }, 3000);

    this.rotate = 0
    this.input.on('pointermove', function(pointer) {
      this.rotate =Phaser.Math.Angle.Between(this.playerTankBarrel.body.x,this.playerTankBarrel.body.y, pointer.worldX,pointer.worldY);
      console.log(pointer);
    }.bind(this))
    this.input.setPollAlways();

  }

  update() {
    this.playerTankContainer.body.velocity.x = 0;
    this.playerTankContainer.body.velocity.y = 0;
    this.playerTankContainer.body.angularVelocity = 0;
    this.playerTankBarrel.body.angularVelocity = 0;

    this.playerTankBarrel.x =  this.playerTankContainer.x;
    this.playerTankBarrel.y =  this.playerTankContainer.y;

    this.playerTankBarrel.rotation = this.rotate+Math.PI/2;

    // this.input.activePointer.updateWorldPoint()
    // this.playerTankBarrel.rotation = Phaser.Math.Angle.Between(this.playerTankBarrel.x, this.playerTankBarrel.y, this.input.activePointer.x, this.input.activePointer.y)
    //rotation cannon
 
    const speed = 150
    const velocityX = Math.cos(this.playerTankContainer.rotation) * speed
    const velocityY = Math.sin(this.playerTankContainer.rotation) * speed

    //this.playerTankContainer.rotation += Phaser.Math.Between(-0.015, 0.015)

    if (this.arrows.left.isDown) {
     this.playerTankContainer.body.angularVelocity = -200;
    } else if (this.arrows.right.isDown) {
     this.playerTankContainer.body.angularVelocity = 200;

    }
  
    if (this.arrows.up.isDown) {
      // console.log(this.physics.velocityFromAngle(this.player.angle, 200,this.playerTankContainer.body.velocity));
     this.playerTankContainer.body.velocity.y = -velocityX
     this.playerTankContainer.body.velocity.x = velocityY

    } else if (this.arrows.down.isDown) {
     this.playerTankContainer.body.velocity.y = velocityX
     this.playerTankContainer.body.velocity.x = -velocityY
    }  

    // Move tank barrel
    if (this.keys.a.isDown){
      this.playerTankBarrel.body.angularVelocity = -200
 
    }
    if (this.keys.d.isDown){
      this.playerTankBarrel.body.angularVelocity = 200
 
    }
    if (this.keys.space.isDown) {
      // console.log('fire');
      const speed = 30
      const barrelDirectionX = this.playerTankBarrel.body.rotation 
      const barrelDirectionY =this.playerTankBarrel.body.rotation

      // console.log('directionX - ' + barrelDirectionX );
      // console.log('directionY - ' + barrelDirectionY );

      this.bullets.fireBullet(this.playerTankBarrel.body.x, this.playerTankBarrel.body.y, barrelDirectionX, barrelDirectionY)
    }
  }
};