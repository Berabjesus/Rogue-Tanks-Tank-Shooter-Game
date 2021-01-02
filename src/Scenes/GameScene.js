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

    this.player = this.physics.add.sprite(500, 400, 'player').setScale(0.3, 0.3)
    // this.player.setCollideWorldBounds(true);
    // this.player.angle = -50
    console.log(this.player.body);
    this.physics.add.collider(this.player, this.walls);

    this.camera = this.cameras.main;
    this.camera.startFollow(this.player);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // const speed = 175;
    // const angle = 5
    // // Stop any previous movement from the last frame
    // this.player.body.setVelocity(0);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.player.body.angularVelocity = 0;
    const vx = Math.cos(this.player.rotation) * 100
    const vy = Math.sin(this.player.rotation) * 100

    // Horizontal movement
    if (this.cursors.left.isDown) {
      // this.player.angle += -angle;
      this.player.body.angularVelocity = -200;

      // console.log('ang --- ' + this.player.angle);
      // console.log(this.player.body.velocity);
      // console.log(this.player.body.velocity.x);
      // console.log(this.player.body.velocity.y);

      // let vx = Math.cos(rect.rotation)
      // console.log('rot --- ' + this.player.rotation);

    } else if (this.cursors.right.isDown) {
      // this.player.angle += angle;
      this.player.body.angularVelocity = 200;
    }
  
    // Vertical movement
    if (this.cursors.up.isDown) {
      // this.player.body.setVelocityY(-speed);
      // object.x = object.x + distance * Math.cos(object.rotation);
      // this.player.y += -10 * Math.cos(this.player.rotation)
      // this.player.body.angularVelocity = -speed
      // console.log(this.physics.velocityFromAngle(this.player.angle, 200, this.player.body.velocity));
      this.player.body.velocity.y = -vx
      this.player.body.velocity.x = vy

    } else if (this.cursors.down.isDown) {
      // this.player.body.setVelocityY(speed);
    }
  
    // Normalize and scale the velocity so that this.player can't move faster along a diagonal
    // this.player.body.velocity.normalize().scale(speed);
  }
};