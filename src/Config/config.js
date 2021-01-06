export default {
  type: Phaser.AUTO,
  width: 1200,
  height: 650,
  backgroundColor: "black",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true
    }
  },scale: {
    zoom: 1
  },
  /* 
    -> The two rules below pixlate images
    pixelArt: true,
    roundPixels: true,

  */ 
  parent: 'main'
};