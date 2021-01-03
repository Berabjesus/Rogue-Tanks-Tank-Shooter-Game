import 'phaser';
import tilePng from '../Assets/tile/main.png'
import tileJson from '../Assets/tile/main.json'
import bgmusic from '../Assets/audio/TownTheme.ogg'
import player from '../Assets/tank/player.png'
import playerTankBarrel from '../Assets/tank/playerTankBarrel.png'
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
    this.madeBy = this.add.image(10, 10, 'madeBy').setOrigin(0, 0).setScale(0.3, 0.3);
    this.phaserLogo = this.add.image(400, 300, 'phaserLogo').setOrigin(0.5, 0.5).setScale(0.8, 0.8);
    const name = this.make.text({
      x: 10,
      y: 150,
      text: 'Code by Bereket',
      style: {
        font: '15px monospace',
        fill: '#ffffff'
      }
    });

    this.time.delayedCall(2000, function () {
      this.tweens.add({
        targets: this.phaserLogo,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete:() => {
          this.gameLogo = this.add.image(450, 300, 'gameLogo').setOrigin(0.5, 0.5).setScale(1, 1);
        }
      }, this);
    }.bind(this))

    this.load.image('tile', tilePng)
    this.load.tilemapTiledJSON('map', tileJson)
    this.load.audio('bgMusic', [bgmusic])
    this.load.spritesheet('player', player, {
      frameWidth: 256,
      frameHeight: 256
    })
    this.load.spritesheet('playerTankBarrel', playerTankBarrel, {
      frameWidth: 256,
      frameHeight: 256
    })
  }
 
  create () {
    this.scene.start('Game')
  }
};