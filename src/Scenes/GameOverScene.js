import 'phaser'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver')
  }

  create() {
    const tombstone = this.add.image(350, 60, 'tombstone').setOrigin(0, 0)
    const score = this.sys.game.globals.score
    const player = this.sys.game.globals.player

    const ripText = this.add.text(570, 140, '', {
      font: '36px',
      fill: '#000000'
    });
    ripText.setStroke('#000', 4);
    ripText.setShadow(2, 2, "#333333", 2, true, true);
    ripText.setText(['RIP']);

    const text = this.add.text(455, 185, '', {
      font: '22px',
      fill: '#000000'
    });
    text.setStroke('#000', 2);
    text.setShadow(1, 1, "#333333", 1, true, true);

    text.setText([
      'Here lies our great \nsoldier ' + player + ' who died \nfighting the enemy.\n' + player + '  destroyed ' + score + '\npoints worth of enemy \ntanks.',
    ]);

    const backButton = this.add.sprite(380,550, 'normalButton').setScale(0.7, 0.7).setInteractive()
    this.menuText = this.add.text(0,0, 'Restart', { fontSize: '32px', fill: '#fff' })
    Phaser.Display.Align.In.Center(this.menuText, backButton);

    backButton.on('pointerdown', function(pointer) {
      this.scene.start('Game')
    }.bind(this))
    backButton.on('pointerover', function(pointer) {
      backButton.setTexture('hoverButton');
    }.bind(this))
    backButton.on('pointerout', function(pointer) {
      backButton.setTexture('normalButton');
    }.bind(this))

    const playButton = this.add.sprite(780,550, 'normalButton').setScale(0.7, 0.7).setInteractive()
    this.menuText = this.add.text(0,0, 'Rest In Peace', { fontSize: '32px', fill: '#fff' })
    Phaser.Display.Align.In.Center(this.menuText, playButton);

    playButton.on('pointerdown', function(pointer) {
      this.scene.start('Menu')
    }.bind(this))
    playButton.on('pointerover', function(pointer) {
      playButton.setTexture('hoverButton');
    }.bind(this))
    playButton.on('pointerout', function(pointer) {
      playButton.setTexture('normalButton');
    }.bind(this))
  }
}