import 'phaser';
 
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }

  create () {

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Bereket A, Beshane \nMade With: Phaser 3.5, Javascript ES6\nGithub: @Berabjesus', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(this.cameras.main.width/2, this.cameras.main.height/2, this.cameras.main.width, this.cameras.main.height);
    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );
    
    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );
    
    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });
    
    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -200,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Menu');
      }.bind(this)
    });

    this.menuButton = this.add.sprite(10,510, 'blueButton1').setInteractive().setOrigin(0,0)
    this.menuText = this.add.text(0,0, 'Menu', { fontSize: '32px', fill: '#fff' })
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on('pointerdown', function(pointer) {
      this.scene.start('Menu')
    }.bind(this))
  }
};