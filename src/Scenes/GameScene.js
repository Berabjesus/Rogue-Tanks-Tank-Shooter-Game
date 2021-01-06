import 'phaser';
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.reloaded = true
    this.boost = 1000
    this.follow = true
    this.enemyContact = false
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
    this.building = map.createLayer('building', tileset1)
    this.walls.setCollisionByProperty({ collides: true });
    this.building.setCollisionByProperty({collides: true})
    /*
    const map = this.make.tilemap({key: "map"})
    this.mapBaseY = map.heightInPixels;
    const tileset = map.addTilesetImage('tileset', 'tile')

    map.createLayer('Ground', tileset)
    this.walls =  map.createLayer('Wall', tileset)
    this.walls.setCollisionByProperty({ collides: true });

    */

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
    this.playerTankContainer =  this.add.container(600, 400, [ this.player]);
    this.playerTankContainer.setSize(64, 64)
    this.physics.world.enable(this.playerTankContainer);

    // this.player.setCollideWorldBounds(true);

    this.playerTankBarrel = this.physics.add.sprite(100, 100, 'playerTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7)
    this.playerTankBarrel.depth = 10 
    // this.input.on('pointermove', function(pointer) {
    // }.bind(this))
    this.input.setPollAlways();


    this.physics.add.collider(this.playerTankContainer, this.walls);
    this.physics.add.collider(this.playerTankBarrel, this.walls)
    this.physics.add.collider(this.playerTankContainer, this.building)
    this.camera = this.cameras.main;
    this.camera.startFollow(this.playerTankContainer);
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.camera.zoomTo(0.8,2000);
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



    // var points = [ 50, 60, 550, 200, 200, 350, 300, 500, 500, 700, 400 ];
    var points = [[50, 50], [50, 300], [400, 300]]
    // var curve = new Phaser.Curves.Spline(points);


    var curve =  new Phaser.Curves.Path(80, 80)
    curve.lineTo(new Phaser.Math.Vector2(650, 80))
    curve.lineTo(new Phaser.Math.Vector2(650, 1000));
    curve.lineTo(new Phaser.Math.Vector2(80, 1000));
    curve.lineTo(new Phaser.Math.Vector2(80, 80));

    this.curve  = curve
    // var curve =  new Phaser.Curves.Line(new Phaser.Math.Vector2(50, 50), new Phaser.Math.Vector2(50, 500));

    // var curve2 =  new Phaser.Curves.Line(new Phaser.Math.Vector2(50, 500), new Phaser.Math.Vector2(500, 500));

    var graphics = this.add.graphics();

    graphics.lineStyle(1, 0xffffff, 1);

    curve.draw(graphics, 64);
    // curve2.draw(graphics, 64)

    graphics.fillStyle(0x00ff00, 1);

    // for (var i = 0; i < points.length; i++)
    // {
    //     graphics.fillCircle(points[i].x, points[i].y, 4);
    // }

    this.enemy1 = this.add.follower(curve, 100, 100, 'enemy').setScale(0.3, 0.3);
    this.physics.world.enable(this.enemy1);
    this.enemy1.body.setSize(170, 220)
    // this.enemy1.setSizeToFrame(10,10)
    // this.enemy1.setDisplaySize(10,10)
    this.enemy1.ammo = 20

    this.enemy1TankBarrel = this.physics.add.sprite(0 , 0, 'enemyTankBarrel').setScale(0.3,0.3).setOrigin(0.5, 0.7)

    let count =0
    this.pathSetting = {
      duration: 35000,
      yoyo: true,
      repeat: -1,
      rotateToPath: true,
      rotationOffset: 90,
      verticalAdjust: false,
      onComplete:()=>{
        // count++
        // if (count === 1) {
        //   this.enemy1.setPath(curve2)
        // } else if(count > 1){
        //   count = 0
        //   pathSetting.yoyo = true
        //   this.enemy1.startFollow(pathSetting)
        //   this.enemy1.setPath(curve)
        // } 
      }
    }
    this.enemy1.startFollow(this.pathSetting);

    // setTimeout(() => {
    //   this.enemy1.pauseFollow()
    //   setTimeout(() => {
    //     this.enemy1.resumeFollow()
    //   }, 4000);
  
    // }, 8000);

    this.physics.add.collider(this.enemy1, this.walls);
    this.physics.add.collider(this.enemy1, this.playerTankContainer, this.playerAndEnemyCollide);

    this.playerTankContainer.health = 100
    this.enemy1.health = 100
    // this.enemy1.destroy()
    // this.enemy1TankBarrel.destroy()
  }

  rotarteBarrel() {
    this.rotate = Phaser.Math.Angle.Between(this.playerTankBarrel.body.x,this.playerTankBarrel.body.y, this.game.input.mousePointer.worldX,this.game.input.mousePointer.worldY);
    this.playerTankBarrel.rotation = this.rotate+Math.PI/2;
  }

  rotateEnemyBarrel() {
    this.rotEnemyBarrel = Phaser.Math.Angle.Between(this.enemy1.body.x,this.enemy1.body.y, this.playerTankContainer.x, this.playerTankContainer.y);
    this.enemy1TankBarrel.rotation = this.rotEnemyBarrel + Math.PI/2
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

    this.physics.add.collider(newBullet, this.enemy1, function() {
      this.explode(newBullet.x, newBullet.y)
      newBullet.destroy(true)
      this.enemy1.health -= 10
      if (this.enemy1.health <= 0) {
        this.enemy1.destroy(true)
      }
    }, null, this);

    this.physics.moveTo(newBullet,this.game.input.mousePointer.worldX,this.game.input.mousePointer.worldY,500);

    // newBullet.
  }

  fireAtplayer(enemyTank){
    let x = enemyTank.x
    let y = enemyTank.y
    let newBullet=this.physics.add.sprite(x,y,'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30).setOffset(65, 50);
    newBullet.rotation += this.enemy1TankBarrel.rotation

    this.physics.add.collider(newBullet, this.walls, function() {
      this.explode(newBullet.x, newBullet.y)
      newBullet.destroy(true)
    }, null, this);

    this.physics.add.collider(newBullet, this.playerTankContainer, function() {
      this.explode(newBullet.x, newBullet.y)
      newBullet.destroy(true)
      this.playerTankContainer.health -= 10
      if (this.playerTankContainer.health <= 0) {
        this.playerTankContainer.destroy(true)
      }
    }, null, this);

    this.physics.moveTo(newBullet, this.playerTankContainer.x,this.playerTankContainer.y,900);
  }

  // playerAndEnemyCollide() {
  //   this.enemy1.stopFollow()
  //   this.enemyContact = true
  // }

  update() {

    /*
      =========================
     */

        if (this.playerTankContainer.health <= 0 || this.enemy1.health <= 0) {
          if (this.playerTankContainer.health<=0) {
            console.log('u died');
          }else {
            console.log('win');
          }
          this.enemyContact = false
          this.registry.destroy();
          this.events.off();
          this.scene.restart();
          return
        }
        // console.log(this.enemy1.x, this.enemy1.y);
        // console.log(this.playerTankContainer.x, this.playerTankContainer.y);
        var dist = Phaser.Math.Distance.BetweenPoints(this.enemy1, this.playerTankContainer)
        this.physics.add.collider(this.enemy1, this.walls);

        if (dist < 400) {
          !this.enemyContact ? this.enemyContact = true : 
          // this.enemy1.pauseFollow()
          this.rotateEnemyBarrel()
          if (this.enemy1.ammo === 0) {
            this.fireAtplayer(this.enemy1)
            this.enemy1.ammo = 20
          } else {
            this.enemy1.ammo -= 1
          }
          if (dist <= 100) {
            this.follow = false
            this.enemy1.pauseFollow()
          }else if (dist > 200) {
            this.follow = true
          }
          
          if(this.follow) {
            this.enemy1.startFollow(this.playerTankContainer)
            this.enemy1.pathRotationOffset = 90
            var dx =this.playerTankContainer.x - this.enemy1.x;
            var dy =this.playerTankContainer.y - this.enemy1.y;
            var angle = Math.atan2(dy, dx);
            var speed1 = 200;
            this.enemy1.body.setVelocity(
              Math.cos(angle) * speed1,
              Math.sin(angle) * speed1
            );
            var ang = Phaser.Math.Angle.Between(this.enemy1.x, this.enemy1.y, this.playerTankContainer.x, this.playerTankContainer.y);
            this.enemy1.rotation = ang + Math.PI/2
          }
        }else {
          // this.enemy1.resumeFollow()
          // if(this.follow) {
          //   this.enemy1.startFollow(this.pathSetting)
          //   // this.enemy1.setPath(this.curve)
          //   this.follow =false
          // }
          // this.follow = true
          if(this.follow && this.enemyContact)
            this.enemy1.stopFollow()
        }


      /*
      =========================
     */


    this.playerTankContainer.body.velocity.x = 0;
    this.playerTankContainer.body.velocity.y = 0;
    this.playerTankContainer.body.angularVelocity = 0;

    this.playerTankBarrel.x =  this.playerTankContainer.x;
    this.playerTankBarrel.y =  this.playerTankContainer.y;

    this.enemy1TankBarrel.x = this.enemy1.x
    this.enemy1TankBarrel.y = this.enemy1.y

    const speed = 150
    const velocityX = Math.cos(this.playerTankContainer.rotation) * speed
    const velocityY = Math.sin(this.playerTankContainer.rotation) * speed

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

    if (this.mouse.isDown && this.reloaded) {
      this.fireAtEnemy()
      this.reloaded =false
    }

    this.input.on('pointerup', function() {
      this.reloaded = true
    }.bind(this))


    if (this.keys.space.isDown) {
      // console.log('fireAtEnemy');
      this.rotarteBarrel()
      const speed = 30
      const barrelDirectionX = this.playerTankBarrel.body.rotation 
      const barrelDirectionY =this.playerTankBarrel.body.rotation

      // console.log('directionX - ' + barrelDirectionX );
      // console.log('directionY - ' + barrelDirectionY );

    }
  }
};