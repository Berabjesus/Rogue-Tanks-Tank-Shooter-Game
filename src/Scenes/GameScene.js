import 'phaser';
import Enemy from '../components/enemy';
import Path from '../components/paths';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.reloaded = true;
    this.round = 4;
    this.paths = {};
    this.toRespawn = 0;
    this.enemyGroup = [];
    this.scoreNumber = 0;
  }

  create() {
    const { model } = this.sys.game.globals;
    const { bgMusic } = this.sys.game.globals;
    bgMusic.volume = 0.2;
    if (model.musicOn && !model.bgMusicPlaying) {
      if (model.musicPaused) { bgMusic.resume(); } else { bgMusic.play(); }
      model.bgMusicPlaying = true;
    }

    const map = this.make.tilemap({
      key: 'map1',
    });
    const tileset = map.addTilesetImage('street', 'tile1', 32, 32, 0, 0);
    const tileset1 = map.addTilesetImage('_Example', 'build', 32, 32, 0, 0);

    map.createLayer('grass', tileset1);
    map.createLayer('misc', tileset1);
    const walls = map.createLayer('street', tileset);
    this.boundary = map.createLayer('boundary', tileset);
    this.buildings = map.createLayer('building', tileset1);
    walls.setCollisionByProperty({
      collides: true,
    });
    this.buildings.setCollisionByProperty({
      collides: true,
    });
    this.boundary.setCollisionByProperty({
      collides: true,
    });

    this.fire = this.sound.add('fire', {
      volume: 0.5,
    });
    this.add.sprite(350, 420, 'enemy')
      .setScale(0.3, 0.3)
      .setTint(0x706f6f);
    this.add.sprite(390, 440, 'enemyTankBarrel')
      .setScale(0.3, 0.3)
      .setTint(0x706f6f);

    this.player = this.physics.add.sprite(0, 0, 'player')
      .setScale(0.3, 0.3);
    this.player.setMass(100);
    this.playerTankContainer = this.add.container(1700, 2200, [this.player])
      .setSize(64, 64);
    this.playerTankContainer.depth = 2;
    this.playerTankContainer.health = 500;
    this.physics.world.enable(this.playerTankContainer);

    this.playerTankBarrel = this.physics.add.sprite(100, 100, 'playerTankBarrel').setScale(0.3, 0.3).setOrigin(0.5, 0.7);
    this.playerTankBarrel.depth = 10;

    this.physics.add.collider(this.playerTankContainer, walls);
    this.physics.add.collider(this.playerTankContainer, this.buildings);

    const camera = this.cameras.main;
    camera.startFollow(this.playerTankContainer);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.zoomTo(0.75, 1000);

    this.arrows = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      e: Phaser.Input.Keyboard.KeyCodes.E,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.mouse = this.input.mousePointer;
    this.input.setPollAlways();

    this.newPathInstance = new Path(this.add.graphics());
    this.paths = this.newPathInstance.getAllPaths();

    for (const key in this.paths) {
      const newPath = this.paths[key];
      this.createEnemyTank(newPath);
    }

    this.createScoreBox();

    this.createHealthBox();

    this.respawnInterval = setInterval(() => {
      this.respawn();
      if (this.playerTankContainer.health < 500) {
        this.playerTankContainer.health += 5;
        this.health.setText(`Health: ${this.playerTankContainer.health}`);
      }
    }, 5000);


    this.input.on('pointerdown', (pointer) => {
      this.fireAtEnemy();
    });
    this.input.keyboard.on('keydown-SPACE', function () {
      this.fireAtEnemy();
    }.bind(this));
  }

  createScoreBox() {
    this.createBox(-170, -100, 150);
    this.score = this.createText(-170, -100, `Score: ${this.scoreNumber}`);
  }

  createHealthBox() {
    this.createBox(1100, -100, 200);
    this.health = this.createText(1100, -100, `Health: ${this.playerTankContainer.health}`);
  }

  createBox(x, y, width) {
    const box = this.add.graphics();
    box.fillStyle(0x222222, 0.8);
    box.fillRoundedRect(x, y, width, 50, 7);
    box.setScrollFactor(0, 0);
    box.depth = 20;
    return box;
  }

  createText(x, y, newtext) {
    const text = this.add.text(x, y, newtext, {
      font: '40px gothic',
      fill: '#ffffff',
    });
    text.setStroke('#000', 4);
    text.setShadow(2, 2, '#333333', 2, true, true);
    text.setScrollFactor(0, 0);
    text.depth = 20;
    return text;
  }

  createEnemyTank(path) {
    const newEnemy = new Enemy(this, this.scene, path);
    newEnemy.follow(this.newPathInstance.pathSetting);
    this.physics.add.collider(this.playerTankContainer, newEnemy);
    this.enemyGroup.push(newEnemy);
  }

  respawn() {
    if (this.toRespawn > 0) {
      const pathNumberOne = Math.ceil(Math.random() * Object.keys(this.paths).length);
      const pathOne = this.paths[`path${pathNumberOne}`];

      const pathNumberTwo = pathNumberOne === 4 ? pathNumberOne - 1 : pathNumberOne + 1;
      const pathTwo = this.paths[`path${pathNumberTwo}`];

      for (let index = 0; index < this.toRespawn; index++) {
        this.createEnemyTank(pathOne);
        this.createEnemyTank(pathTwo);
      }
      this.toRespawn = 0;
    }
  }

  rotarteBarrel() {
    const rotate = Phaser.Math.Angle.Between(this.playerTankBarrel.body.x, this.playerTankBarrel.body.y, this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    this.playerTankBarrel.rotation = rotate + Math.PI / 2;
  }

  explode(x, y) {
    this.anims.create({
      key: 'boom',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });
    const explosion = this.add.sprite(x, y, 'explosion');
    explosion.play('boom');
    explosion.once('animationcomplete', () => {
      explosion.destroy();
    });
  }

  fireAtEnemy() {
    const { x } = this.playerTankBarrel;
    const { y } = this.playerTankBarrel;
    const newBullet = this.physics.add.sprite(x, y, 'bullet')
      .setScale(0.45, 0.45)
      .setOrigin(0.5, 0.5)
      .setSize(1, 30)
      .setOffset(65, 50);

    newBullet.rotation += this.playerTankBarrel.rotation;
    newBullet.depth = 1;
    newBullet.mass = 0;
    this.physics.add.collider(newBullet, this.buildings, function () {
      this.explode(newBullet.x, newBullet.y);
      newBullet.destroy(true);
    }, null, this);

    this.physics.add.collider(newBullet, this.boundary, function () {
      this.explode(newBullet.x, newBullet.y);
      newBullet.destroy(true);
    }, null, this);

    this.enemyGroup.forEach(enemy => {
      this.physics.add.collider(newBullet, enemy, function () {
        this.explode(newBullet.x, newBullet.y);
        newBullet.destroy(true);
        enemy.health -= 20;
        if (enemy.health <= 0) {
          this.scoreNumber += 10;
          this.score.setText(`Score: ${this.scoreNumber}`);
          this.toRespawn += 1;
          enemy.destroy(true);
          enemy.turret.setActive(false);
          enemy.turret.setTint(0x706f6f);
        }
      }, null, this);
    });

    this.fire.play();
    this.physics.moveTo(newBullet, this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY, 500);
  }

  updatePlayerHealth() {
    this.playerTankContainer.health -= 4;
    this.health.setText(`Health: ${this.playerTankContainer.health}`);
    if (this.playerTankContainer.health <= 0) {
      this.playerTankContainer.destroy(true);
    }
  }

  update() {
    if (this.playerTankContainer.health <= 0) {
      this.registry.destroy();
      this.events.off();
      clearInterval(this.respawnInterval);
      this.sys.game.globals.score = this.scoreNumber;
      this.scoreNumber = 0;
      this.scene.start('GameOver');
      return;
    }

    this.enemyGroup.forEach(enemy => {
      if (enemy && enemy.body) {
        if (this.scoreNumber >= 70) { enemy.update(600); } else if (this.scoreNumber >= 120) { enemy.update(800); } else { enemy.update(400); }
      }
    });

    this.playerTankContainer.body.velocity.x = 0;
    this.playerTankContainer.body.velocity.y = 0;
    this.playerTankContainer.body.angularVelocity = 0;

    this.playerTankBarrel.x = this.playerTankContainer.x;
    this.playerTankBarrel.y = this.playerTankContainer.y;
    this.rotarteBarrel();

    const speed = 200;
    const velocityX = Math.cos(this.playerTankContainer.rotation) * speed;
    const velocityY = Math.sin(this.playerTankContainer.rotation) * speed;

    if (this.arrows.left.isDown) {
      this.playerTankBarrel.angularVelocity = -200;
    } else if (this.arrows.right.isDown) {
      this.playerTankBarrel.body.angularVelocity = 200;
    }

    let boost = 1;
    if (this.keys.e.isDown) {
      boost = 1.5;
    }

    if (this.keys.w.isDown) {
      this.playerTankContainer.body.velocity.y = -velocityX * boost;
      this.playerTankContainer.body.velocity.x = velocityY * boost;
    }
    if (this.keys.s.isDown) {
      this.playerTankContainer.body.velocity.y = velocityX * boost;
      this.playerTankContainer.body.velocity.x = -velocityY * boost;
    }
    if (this.keys.a.isDown) {
      this.playerTankContainer.body.angularVelocity = -200;
    }
    if (this.keys.d.isDown) {
      this.playerTankContainer.body.angularVelocity = 200;
    }
  }
}