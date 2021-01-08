import 'phaser';
import Enemy from '../Components/enemy'
import Path from '../Components/paths'
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.reloaded = true
    this.boost = 1000000
    this.follow = true
    this.enemyContact = false
    this.paths = {}
    // this.respawn = []
    this.enemyGroup = []
  }
 
  preload () {
  }
 
  create () {

    const map = this.make.tilemap({key: 'map1'})
    this.mapBaseY = map.heightInPixels;
    const tileset = map.addTilesetImage('street', 'tile1', 32, 32, 0, 0)
    const tileset1 = map.addTilesetImage('_Example', 'build', 32, 32, 0, 0)

    this.ground = map.createLayer('grass', tileset1)
    this.walls =  map.createLayer('street', tileset)
    this.misc = map.createLayer('misc', tileset1)
    this.buildings = map.createLayer('building', tileset1)
    this.walls.setCollisionByProperty({ collides: true });
    this.buildings.setCollisionByProperty({collides: true});

    this.brokenTank = this.add.sprite( 350, 420, 'enemy').setScale(0.3, 0.3).setTint(0x706f6f);
    this.brokenTank
    this.brokenTankTurret = this.add.sprite( 390, 440, 'enemyTankBarrel').setScale(0.3, 0.3).setTint(0x706f6f);
    // this.cameras.main.scrollX = -80;
    // this.cameras.main.scrollY = (this.mapBaseY - this.cameras.main.height);

    this.player = this.physics.add.sprite(0, 0, 'player').setScale(0.3, 0.3)
    this.playerTankContainer =  this.add.container(600, 400, [ this.player]);
    this.playerTankContainer.setSize(64, 64)
    this.playerTankContainer.depth = 2 
    this.playerTankContainer.health = 15000000
    this.physics.world.enable(this.playerTankContainer);

    this.playerTankBarrel = this.physics.add.sprite(100, 100, 'playerTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7)
    this.playerTankBarrel.depth = 10
    
    this.physics.add.collider(this.playerTankContainer, this.walls);
    this.physics.add.collider(this.playerTankContainer, this.buildings)

    this.camera = this.cameras.main;
    this.camera.startFollow(this.playerTankContainer);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.camera.zoomTo(0.75,2000);

    this.arrows = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      w:  Phaser.Input.Keyboard.KeyCodes.W,
      d:  Phaser.Input.Keyboard.KeyCodes.D,
      a:  Phaser.Input.Keyboard.KeyCodes.A,
      s:  Phaser.Input.Keyboard.KeyCodes.S,
      e:  Phaser.Input.Keyboard.KeyCodes.E,
      space:  Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.boostBar()
    this.mouse = this.input.mousePointer
    this.input.setPollAlways();

    this.path = new Path(this.add.graphics())
    this.curve = this.path.pathOne
    // const curve2 = path.pathTwo
    // const curve3 = path.pathThree
    // const curve4 = path.pathFour

    this.paths = this.path.getAllPaths()
  
    for (const key in this.paths) {
      let newPath = this.paths[key]
    }

    // this.en1= new Enemy(this,this.scene, curve)
    // this.en1.follow(path.pathSetting)

    // console.log(this.en1);
    // this.en = new Enemy(this,this.scene, curve4)
    // this.en.follow(path.pathSetting)

    // this.en2 = new Enemy(this,this.scene, curve2)
    // this.en2.follow(path.pathSetting)

    // this.en3 = new Enemy(this,this.scene, curve3)
    // this.en3.follow(path.pathSetting)

    // this.enarr = []
    // this.enarr.push(this.en, this.en1, this.en2, this.en3)

    setInterval(() => {
      this.respawn()
      console.log(this.enemyGroup);
    }, 10000);
  }

  respawn(){
    this.en1= new Enemy(this,this.scene, this.curve)
    this.en1.follow(this.path.pathSetting)
    this.enemyGroup.push(this.en1)
  }

  rotarteBarrel() {
    this.rotate = Phaser.Math.Angle.Between(this.playerTankBarrel.body.x,this.playerTankBarrel.body.y, this.game.input.mousePointer.worldX,this.game.input.mousePointer.worldY);
    this.playerTankBarrel.rotation = this.rotate+Math.PI/2;
  }

  boostBar() {
    this.boostProgressBox = this.add.graphics();
    this.boostProgressBox.fillStyle(0x222222, 0.8);
    this.boostProgressBox.fillRoundedRect(10, 10, 150, 18, 7);
    this.boostProgressBar = this.add.graphics();
    this.boostProgressBar.fillStyle(0xffffff, 1);
    this.boostProgressBar.fillRoundedRect(10, 10, 10,18, 6);

    this.boostContainer = this.add.container(10, 10, [ this.boostProgressBox, this.boostProgressBar]);
    this.boostContainer.setScrollFactor(0,0);
  }

  explode(x,y) {
    this.anims.create({
      key: 'boom',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: 0
    });
    let explosion =  this.add.sprite(x, y , 'explosion')
    explosion.play('boom')
    explosion.once('animationcomplete', () => {
      explosion.destroy()
    })
  }

  fireAtEnemy() {
    let x = this.playerTankBarrel.x
    let y = this.playerTankBarrel.y
    let newBullet=this.physics.add.sprite(x,y,'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30).setOffset(65, 50);

    newBullet.rotation += this.playerTankBarrel.rotation
    newBullet.depth = 1

    this.physics.add.collider(newBullet, this.walls, function() {
      this.explode(newBullet.x, newBullet.y)
      newBullet.destroy(true)
    }, null, this);

    /*
      this.enarr.forEach(enemy => {
        this.physics.add.collider(newBullet, enemy, function() {
          this.explode(newBullet.x, newBullet.y)
          newBullet.destroy(true)
          enemy.health -= 10
          if (enemy.health <= 0) {
            // enemy.destroy(true)
            // delete enemy
            enemy.setActive(false)
            enemy.setVisible(false)    
            enemy._turret.setActive(false)
            enemy._turret.setVisible(false)
            console.log(enemy);  
          }
        }, null, this);
      });

      */

    this.physics.moveTo(newBullet,this.game.input.mousePointer.worldX,this.game.input.mousePointer.worldY,500);
  }

  update() {

    if (this.playerTankContainer.health <= 0) {
        console.log('u died');
      this.enemyContact = false
      this.registry.destroy();
      this.events.off();
      this.scene.restart();
      return
    } 
    // if(this.en.active)
    // this.en.update()

    // if(this.en1.active)
    // this.en1.update()

    // if(this.en2.active)
    // this.en2.update()

    // if(this.en3.active)
    // this.en3.update()

    this.playerTankContainer.body.velocity.x = 0;
    this.playerTankContainer.body.velocity.y = 0;
    this.playerTankContainer.body.angularVelocity = 0;

    this.playerTankBarrel.x =  this.playerTankContainer.x;
    this.playerTankBarrel.y =  this.playerTankContainer.y;
    this.rotarteBarrel()

    const speed = 150
    const velocityX = Math.cos(this.playerTankContainer.rotation) * speed
    const velocityY = Math.sin(this.playerTankContainer.rotation) * speed

    if (this.arrows.left.isDown) {
      this.playerTankBarrel.angularVelocity = -200

    } else if (this.arrows.right.isDown) {
      this.playerTankBarrel.body.angularVelocity = 200
    }
    
    if (this.keys.w.isDown){
      let boost = 1
      if (this.keys.e.isDown && this.boost > 2){ 
        boost = 2
        this.boost -= 2
      }  
      this.playerTankContainer.body.velocity.y = -velocityX * boost
      this.playerTankContainer.body.velocity.x = velocityY * boost
    }
    if (this.keys.s.isDown){
      let boost = 1
      if (this.keys.e.isDown && this.boost > 2){ 
        boost = 2
        this.boost -= 2
      }
      this.playerTankContainer.body.velocity.y = velocityX * boost
      this.playerTankContainer.body.velocity.x = -velocityY * boost
    }
    if (this.keys.a.isDown){
      this.playerTankContainer.body.angularVelocity = -200;
    }
    if (this.keys.d.isDown){
      this.playerTankContainer.body.angularVelocity = 200;
    }

    if ((this.mouse.isDown || this.keys.space.isDown) && this.reloaded) {
      this.fireAtEnemy()
      this.reloaded =false
    }

    this.input.on('pointerup', function() {
      this.reloaded = true
    }.bind(this))

    if (Phaser.Input.Keyboard.JustUp(this.keys.space)) {
      this.reloaded = true
    }
  }
};