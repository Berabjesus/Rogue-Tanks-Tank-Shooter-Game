import 'phaser';
 
export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }
 
  preload () {
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
 
  create () {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(500, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(500, 200, 'checkedBox');
    this.musicText = this.add.text(550, 190, 'Music Enabled', { fontSize: 24 });
    
    this.soundButton = this.add.image(500, 300, 'checkedBox');
    this.soundText = this.add.text(550, 290, 'Sound Enabled', { fontSize: 24 });
    
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

    this.menuButton = this.add.sprite(100, 500, 'blueButton1').setInteractive()
    this.menuText = this.add.text(0,0, 'Menu', { fontSize: '32px', fill: '#fff' })
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', function(pointer) {
      this.scene.start('Menu')
    }.bind(this))
    
    const fullscreenButton = this.add.sprite(500, 400, 'fullscreen').setScale(0.15, 0.15).setInteractive()
    const fsText = this.add.text(550, 390, 'Fullscreen', { fontSize: 24 });

    fullscreenButton.on('pointerdown', function(pointer) {
      this.scale.startFullscreen();
    }.bind(this))
    this.updateAudio();
  }
};