import 'phaser';
import tilePng from '../Assets/tile/main.png'
import tileJson from '../Assets/tile/main.json'
import bgmusic from '../Assets/audio/TownTheme.ogg'
import player from '../Assets/tank/player.png'
import playerTankBarrel from '../Assets/tank/playerTankBarrel.png'
import bulletShell from '../Assets/tank/HeavyShell.png'
import explosion  from '../Assets/tank/explosion.png'
import enemy from '../Assets/tank/enemy.png'
import enemyTankBarrel from '../Assets/tank/enemyTankBarrel.png'

/*
*/

import citypng from '../Assets/tile/city.png'
import bpng from '../Assets/tile/_Example.png'
import cityjson from '../Assets/tile/city.json'
/*
*/


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


    /*
    */

      this.load.image('tile1', citypng)
      this.load.image('build', bpng)
      this.load.tilemapTiledJSON('map1', cityjson)

    /*
    */


    this.load.audio('bgMusic', [bgmusic])
    this.load.spritesheet('player', player, {
      frameWidth: 256,
      frameHeight: 256
    })
    this.load.spritesheet('playerTankBarrel', playerTankBarrel, {
      frameWidth: 256,
      frameHeight: 256
    })

    this.load.spritesheet('bullet', bulletShell, {
      frameWidth: 256,
      frameHeight: 256
    })

    this.load.spritesheet('explosion', explosion,  {
      frameWidth: 60,
      frameHeight: 60
    })

    this.load.spritesheet('enemy', enemy, {
      frameWidth: 256,
      frameHeight: 256
    })
    this.load.spritesheet('enemyTankBarrel', enemyTankBarrel, {
      frameWidth: 256,
      frameHeight: 256
    })
  }
 
  create () {
    this.scene.start('Game')
  }
};
