import 'phaser'
import Button from '../components/button'

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro')
    this.skipped = false
  }

  setPlayButtonActive() {
    new Button(this, 580, 550, 'normalButton', 'hoverButton', 'Chicken Out', 'Menu', {
      x: 0.7,
      y: 0.7
    })

    new Button(this, 980, 550, 'normalButton', 'hoverButton', 'Lets Go!', 'Game', {
      x: 0.7,
      y: 0.7
    })
  }

  create() {
    const text = this.add.text(10, 10, '', {
      font: '32px',
      fill: '#ffffff'
    });

    text.setText([
      'Objectives\n',
      '1. Kill As many enemies as you can',
      '2. Keep your distance from the enemy',
      '\nControls\n',
      '- Use W, S, A and D buttons to move around',
      '- Use E to boost speed',
      '- Move the tank turret around with the mouse',
      '- Use left click or Space button to fire',
      '\nTips\n',
      '- Your health will fill back up every five seconds',
      '- The enemy tanks will detect you faster \nas your score increases',
      '\n\nGood Luck!'
    ]);

    this.bgMusic = this.sys.game.globals.bgMusic
    this.bgMusic.volume = 0.12
    const intro = this.sound.add('introVoice', {
      volume: 0.5
    });
    intro.on('complete', function () {
      if (!this.skipped)
        this.setPlayButtonActive()
    }.bind(this))

    setTimeout(() => {
      intro.play()
      const skipButton = this.add.sprite(980, 550, 'normalButton').setScale(0.7, 0.7).setInteractive()
      this.menuText = this.add.text(0, 0, 'Skip >>>', {
        fontSize: '32px',
        fill: '#fff'
      })
      Phaser.Display.Align.In.Center(this.menuText, skipButton);

      skipButton.on('pointerdown', function (pointer) {
        intro.stop()
        this.setPlayButtonActive()
        this.skipped = true
      }.bind(this))
      skipButton.on('pointerover', function (pointer) {
        skipButton.setTexture('hoverButton');
      }.bind(this))
      skipButton.on('pointerout', function (pointer) {
        skipButton.setTexture('normalButton');
      }.bind(this))
    }, 1000);

  }
}