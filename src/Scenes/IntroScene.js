import 'phaser'

export default class IntroScene extends Phaser.Scene {
  constructor(){
    super('Intro')
  }

  preload(){
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
  }

  create(){
    const text = this.add.bitmapText(400, 300, 'atari', '', 38)
    .setOrigin(0.5)
    .setCenterAlign();

    text.setText([
        'Phaser 3',
        'BitmapText',
        'Click to change Font'
    ]);
  }
}