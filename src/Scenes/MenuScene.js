import 'phaser';
 
export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('Menu');
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(this.cameras.main.width/2, this.cameras.main.height/2 - offset * 100, this.cameras.main.width, this.cameras.main.height)
    );
  }
  
  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
 
  create () {

    this.gameButton = this.add.sprite(100, 200, 'normalButton').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', function (pointer) {
      this.scene.start('Game');
    }.bind(this));

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('hoverButton');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('normalButton');
    });

    this.optionsButton = this.add.sprite(300, 200, 'normalButton').setInteractive();
    this.centerButton(this.optionsButton);
    
    this.optionsText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.optionsText, this.optionsButton);
    
    this.optionsButton.on('pointerdown', function (pointer) {
      this.scene.start('Options');
    }.bind(this));
    
    this.creditsButton = this.add.sprite(300, 200, 'normalButton').setInteractive();
    this.centerButton(this.creditsButton, -1);
    
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.creditsText, this.creditsButton);
    
    this.creditsButton.on('pointerdown', function (pointer) {
      this.scene.start('Credits');
    }.bind(this));

    this.model = this.sys.game.globals.model;
    this.bgMusic = this.sys.game.globals.bgMusic
    if (this.model.musicOn === true && !this.model.bgMusicPlaying) {
      if(this.model.musicPaused)
        this.bgMusic.resume();
      else
        this.bgMusic.play();
      this.model.bgMusicPlaying = true
    }
  }
};