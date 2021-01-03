import 'phaser';

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
    this.playerTankBarrel = this.physics.add.sprite(0, 0, 'playerTankBarrel').setScale(0.3,0.3)
    this.playerTankContainer =  this.add.container(500, 400, [ this.player, this.playerTankBarrel ]);

    this.physics.world.enable(this.playerTankContainer);
    // this.player.setCollideWorldBounds(true);
    // this.player.angle = -50
    this.physics.add.collider(this.playerTankContainer, this.walls);

    this.camera = this.cameras.main;
    this.camera.startFollow(this.playerTankContainer);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
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
  }

  update() {
   this.playerTankContainer.body.velocity.x = 0;
   this.playerTankContainer.body.velocity.y = 0;
   this.playerTankContainer.body.angularVelocity = 0;
    const vx = Math.cos(this.playerTankContainer.rotation) * 150
    const vy = Math.sin(this.playerTankContainer.rotation) * 150

    //this.playerTankContainer.rotation += Phaser.Math.Between(-0.015, 0.015)

    if (this.cursors.left.isDown) {
     this.playerTankContainer.body.angularVelocity = -200;
    } else if (this.cursors.right.isDown) {
     this.playerTankContainer.body.angularVelocity = 200;
    }
  
    if (this.cursors.up.isDown) {
      // console.log(this.physics.velocityFromAngle(this.player.angle, 200,this.playerTankContainer.body.velocity));

     this.playerTankContainer.body.velocity.y = -vx
     this.playerTankContainer.body.velocity.x = vy

    } else if (this.cursors.down.isDown) {
     this.playerTankContainer.body.velocity.y = vx
     this.playerTankContainer.body.velocity.x = -vy
    }  
  }
};