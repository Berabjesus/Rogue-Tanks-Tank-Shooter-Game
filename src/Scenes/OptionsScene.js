import 'phaser';
import Button from '../components/button'

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.bgMusic.pause()
      this.model.bgMusicPlaying = false
      this.model.musicPaused = true
    } else {
      this.musicButton.setTexture('checkedBox');
      if (!this.model.bgMusicPlaying) {
        this.bgMusic.resume()
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.add.text(500, 100, 'Options', {
      fontSize: 40
    });
    this.musicButton = this.add.image(500, 200, 'checkedBox');
    this.musicText = this.add.text(550, 190, 'Music Enabled', {
      fontSize: 24
    });

    this.soundButton = this.add.image(500, 300, 'checkedBox');
    this.soundText = this.add.text(550, 290, 'Sound Enabled', {
      fontSize: 24
    });

    this.bgMusic = this.sys.game.globals.bgMusic

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.bgMusic = this.sys.game.globals.bgMusic
    this.model = this.sys.game.globals.model;

    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', 'Menu', {
      x: 0.7,
      y: 0.7
    })

    this.updateAudio();
  }
};