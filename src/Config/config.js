export default {
  type: Phaser.AUTO,
  width: 800,
  height: 650,
  scale: {
  mode: Phaser.Scale.RESIZE,
  autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  parent: 'main'
};