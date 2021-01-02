import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
  }
 
  create () {
    const map = this.make.tilemap({key: "map", tileWidth: 8, tileHeight: 8})
    const tileset = map.addTilesetImage('tileset', 'tile')

    map.createLayer('Ground', tileset)
    this.walls =  map.createLayer('Wall', tileset)
    this.walls.setCollisionByProperty({ collides: true });
    this.cameras.main.scrollX = -80;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.up.isDown)
    {
      this.cameras.main.scrollY -= 4;
    }
    else if (this.cursors.down.isDown)
    {
      this.cameras.main.scrollY += 4;
    }

    if (this.cursors.left.isDown)
    {
      this.cameras.main.scrollX -= 4;
    }
    else if (this.cursors.right.isDown)
    {
      this.cameras.main.scrollX += 4;
    }
  }
};