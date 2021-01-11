import Phaser from 'phaser';

export default class TankTools extends Phaser.Physics.Arcade.Sprite {
  constructor(mainScene, x, y, texture) {
    super(mainScene.scene, x, y, texture);
    mainScene.scene.add.existing(this);
  }
}