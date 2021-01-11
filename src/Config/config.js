/* eslint-disable no-undef */

export default {
  type: Phaser.AUTO,
  width: 1200,
  height: 650,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scale: {
    zoom: 1,
  },

  parent: 'main',
  dom: {
    createContainer: true,
  },
};