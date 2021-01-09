import 'phaser';
import citypng from '../Assets/tile/city.png'
import bpng from '../Assets/tile/_Example.png'
import cityjson from '../Assets/tile/city.json'
import bgmusic from '../Assets/audio/TownTheme.ogg'
import normalButton from '../Assets/ui/buttonNormal.png';
import hoverButton from '../Assets/ui/buttonHighLight.png';
import grey from '../Assets/ui/grey_box.png'
import blue from '../Assets/ui/blue_boxCheckmark.png'
import introVoiceMp3 from '../Assets/audio/intro.mp3'
import introVoiceOgg from '../Assets/audio/intro.ogg'
import player from '../Assets/tank/player.png'
import playerTankBarrel from '../Assets/tank/playerTankBarrel.png'
import bulletShell from '../Assets/tank/HeavyShell.png'
import explosion  from '../Assets/tank/explosion.png'
import enemy from '../Assets/tank/enemy.png'
import enemyTankBarrel from '../Assets/tank/enemyTankBarrel.png'


export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    const avatar = this.add.image(10, 10, 'madeBy').setOrigin(0, 0).setScale(0.3, 0.3);
    // this.phaserLogo = this.add.image(width/1.9, 300, 'phaserLogo').setOrigin(0.5, 0.5).setScale(0.8, 0.8);
    const name = this.make.text({
      x: 10,
      y: 150,
      text: 'Code by Bereket',
      style: {
        font: '15px monospace',
        fill: '#ffffff'
      }
    });

    this.time.delayedCall(10, function () {
      this.tweens.add({
        targets: this.phaserLogo,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete:() => {
          this.gameLogo = this.add.image(width/1.9, 300, 'gameLogo').setOrigin(0.5, 0.5).setScale(1, 1);
        }
      }, this);
    }.bind(this))

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(450, 450, 350, 18, 7);
  
    console.log(width, height);
    
    var loadingText = this.make.text({
      x: width/1.9,
      y: 420,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width/1.9,
      y: 460,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width/1.9,
      y: 490,
      text: '',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(450, 450, 300 * value,18, 6);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.time.delayedCall(1000, function() {
        // logo.destroy();
        avatar.destroy()
        name.destroy()
        this.startTitleScene()
      }.bind(this));
    }.bind(this));

    this.load.image('tile1', citypng)
    this.load.image('build', bpng)
    this.load.tilemapTiledJSON('map1', cityjson)

    this.load.image('normalButton', normalButton);
    this.load.image('hoverButton', hoverButton);
    this.load.image('box', grey);
    this.load.image('checkedBox', blue);
    this.load.audio('bgMusic', [bgmusic])
    this.load.audio('introVoice', [introVoiceMp3, introVoiceOgg])
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
 
startTitleScene() {
  this.scene.start('Menu');
}
 
  create () {
    this.sys.game.globals.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
  }
};
