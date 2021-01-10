/* eslint-disable max-len */
/* eslint-disable func-names */

import 'phaser';
import TankTools from './TankTools';

export default class Enemy extends Phaser.GameObjects.PathFollower {
  constructor(world, mainScene, path) {
    super(mainScene.scene, path, path.points.x, path.points.y, 'enemy');
    this.world = world;
    this.player = world.playerTankContainer;
    this.mainScene = mainScene;
    this.mainScene.scene.add.existing(this);
    this.mainScene.scene.physics.world.enable(this);

    this.setScale(0.3, 0.3);
    this.body.setSize(170, 220);
    this.turret = new TankTools(this.mainScene, 0, 0, 'enemyTankBarrel').setScale(0.3, 0.3).setOrigin(0.5, 0.7);
    this.turret.depth = 1.2;
    this.fire = this.world.sound.add('enemyFire', {
      volume: 0.3,
    });
    this.ammo = 20;
    this.mass = 100;
    this.depth = 1;
    this.enemyContact = false;
    this.chasePlayer = false;
    this.health = 100;
  }

  follow(pathSetting) {
    this.startFollow(pathSetting);
    this.world.physics.add.collider(this, this.world.buildings);
    this.world.physics.add.collider(this, this.player);
    this.world.physics.add.collider(this.player, this);
  }

  attachTurret() {
    this.turret.x = this.x;
    this.turret.y = this.y;
  }

  rotateTurret() {
    const angel = Phaser.Math.Angle.Between(this.body.x, this.body.y, this.player.x, this.player.y);
    this.turret.rotation = angel + Math.PI / 2;
  }

  explodeBullet(bullet) {
    this.world.explode(bullet.x, bullet.y);
    bullet.destroy(true);
  }

  updatePlayerStatus() {
    this.world.updatePlayerHealth();
  }

  attackPlayer() {
    const newBullet = this.world.physics.add.sprite(this.x, this.y, 'bullet').setScale(0.45, 0.45).setOrigin(0.5, 0.5).setSize(1, 30)
      .setOffset(65, 50);

    newBullet.rotation = this.turret.rotation;
    newBullet.mass = 0;
    this.world.physics.add.collider(newBullet, this.world.buildings, this.explodeBullet.bind(this), null, this);

    this.world.physics.add.collider(newBullet, this.world.boundary, this.explodeBullet.bind(this), null, this);

    this.world.physics.add.collider(newBullet, this.player, function () {
      this.explodeBullet(newBullet);
      this.updatePlayerStatus();
    }, null, this);

    this.fire.play();
    this.world.physics.moveTo(newBullet, this.player.x, this.player.y, 900);
  }

  followPlayer() {
    this.startFollow(this.player);
    this.pathRotationOffset = 90;
    const dx = this.player.x - this.x;
    const dy = this.player.y - this.y;
    const angle = Math.atan2(dy, dx);
    const chaseSpeed = 300;
    this.body.setVelocity(Math.cos(angle) * chaseSpeed,
      Math.sin(angle) * chaseSpeed);

    const rotation = Phaser.Math.Angle.Between(this.x, this.y, this.player.x, this.player.y);
    this.rotation = rotation + Math.PI / 2;
  }

  playerInRange() {
    return Phaser.Math.Distance.BetweenPoints(this, this.player);
  }

  update(radius) {
    this.attachTurret();

    if (this.playerInRange() < radius) {
      if (!this.enemyContact) this.enemyContact = true;

      this.rotateTurret();

      if (this.playerInRange() <= 100) {
        this.stopFollow();
        this.chasePlayer = false;
      } else if (this.playerInRange() > 200) {
        this.chasePlayer = true;
      }

      if (this.chasePlayer) {
        this.followPlayer();
      }

      if (this.ammo === 20) {
        this.attackPlayer();
        this.ammo = 0;
      } else {
        this.ammo += 1;
      }
    } else if (this.enemyContact) {
      this.stopFollow();
    }
  }
}