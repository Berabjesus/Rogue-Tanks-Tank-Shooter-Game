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
    // this.bullet = this.physics.add.sprite(500,410, 'bullet').setScale(0.7, 0.7).setOrigin(0.5, 1)
    this.bullets = new Bullets(this)

    // this.bullet = this.physics.add.sprite(0, 0, 'bullet').setScale(0.8,0.8).setOrigin(0.5, 0.7)

    this.playerTankContainer =  this.add.container(500, 400, [ this.player]);
    this.playerTankContainer.setSize(64, 64)
    this.physics.world.enable(this.playerTankContainer);

    // this.player.setCollideWorldBounds(true);
    // this.player.angle = -50

    this.playerTankBarrel = this.physics.add.sprite(100, 100, 'playerTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7)
    this.rotate = 0
    // this.input.on('pointermove', function(pointer) {
    // }.bind(this))
    this.input.setPollAlways();


    this.physics.add.collider(this.playerTankContainer, this.walls);
    this.physics.add.collider(this.playerTankBarrel, this.walls)
    this.camera = this.cameras.main;
    this.camera.startFollow(this.playerTankContainer);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.arrows = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      w:  Phaser.Input.Keyboard.KeyCodes.W,
      d:  Phaser.Input.Keyboard.KeyCodes.D,
      a:  Phaser.Input.Keyboard.KeyCodes.A,
      s:  Phaser.Input.Keyboard.KeyCodes.S,
      e:  Phaser.Input.Keyboard.KeyCodes.E,
      space:  Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
    this.mouse = this.input.mousePointer
    this.boostBar()
    this.boost = 1000
  }

  rotarteBarrel() {
    this.rotate =Phaser.Math.Angle.Between(this.playerTankBarrel.body.x,this.playerTankBarrel.body.y, this.game.input.mousePointer.worldX,this.game.input.mousePointer.worldY);
    this.playerTankBarrel.rotation = this.rotate+Math.PI/2;
  }

  boostBar() {
    this.boostProgressBox = this.add.graphics();
    this.boostProgressBox.fillStyle(0x222222, 0.8);
    this.boostProgressBox.fillRoundedRect(10, 10, 150, 18, 7);
    this.boostProgressBar = this.add.graphics();
    this.boostProgressBar.fillStyle(0xffffff, 1);
    this.boostProgressBar.fillRoundedRect(10, 10, 10,18, 6);

    console.log(this.boostProgressBar);
    this.boostContainer = this.add.container(10, 10, [ this.boostProgressBox, this.boostProgressBar]);
    this.boostContainer.setScrollFactor(0,0);
  }

  fire() {
    let x = this.playerTankBarrel.x
    let y = this.playerTankBarrel.y
    let cannonball=this.physics.add.sprite(x,y,'bullet').setScale(0.7, 0.7).setOrigin(0.5, 0.5);
    this.physics.moveTo(cannonball,this.game.input.mousePointer.worldX,this.game.input.mousePointer.worldY,500);
  }

  update() {
    this.playerTankContainer.body.velocity.x = 0;
    this.playerTankContainer.body.velocity.y = 0;
    this.playerTankContainer.body.angularVelocity = 0;
    this.playerTankBarrel.body.angularVelocity = 0;

    this.playerTankBarrel.x =  this.playerTankContainer.x;
    this.playerTankBarrel.y =  this.playerTankContainer.y;


    // this.input.activePointer.updateWorldPoint()
    // this.playerTankBarrel.rotation = Phaser.Math.Angle.Between(this.playerTankBarrel.x, this.playerTankBarrel.y, this.input.activePointer.x, this.input.activePointer.y)
    //rotation cannon
 
    const speed = 150
    const velocityX = Math.cos(this.playerTankContainer.rotation) * speed
    const velocityY = Math.sin(this.playerTankContainer.rotation) * speed

    //this.playerTankContainer.rotation += Phaser.Math.Between(-0.015, 0.015)

    if (this.arrows.left.isDown) {
      this.playerTankBarrel.angularVelocity = -200

    } else if (this.arrows.right.isDown) {
      this.playerTankBarrel.body.angularVelocity = 200
    }
    
    this.rotarteBarrel()
    
    // Move tank barrel
    if (this.keys.w.isDown){
      var boost = 1
      if (this.keys.e.isDown && this.boost > 2){ 
        boost = 2
        this.boost -= 2
      }  
      this.playerTankContainer.body.velocity.y = -velocityX * boost
      this.playerTankContainer.body.velocity.x = velocityY * boost
      this.rotarteBarrel()
    }
    if (this.keys.s.isDown){
      var boost = 1
      if (this.keys.e.isDown && this.boost > 2){ 
        boost = 2
        this.boost -= 2
      }
      this.playerTankContainer.body.velocity.y = velocityX * boost
      this.playerTankContainer.body.velocity.x = -velocityY * boost
      this.rotarteBarrel()
    }
    if (this.keys.a.isDown){
      this.playerTankContainer.body.angularVelocity = -200;
    }
    if (this.keys.d.isDown){
      this.playerTankContainer.body.angularVelocity = 200;
    }

    if (this.mouse.isDown) {
      this.fire()
    }


    if (this.keys.space.isDown) {
      // console.log('fire');
      this.rotarteBarrel()
      const speed = 30
      const barrelDirectionX = this.playerTankBarrel.body.rotation 
      const barrelDirectionY =this.playerTankBarrel.body.rotation

      // console.log('directionX - ' + barrelDirectionX );
      // console.log('directionY - ' + barrelDirectionY );

      this.bullets.fireBullet(this.playerTankBarrel.body.x, this.playerTankBarrel.body.y, barrelDirectionX, barrelDirectionY)
    }
  }
};