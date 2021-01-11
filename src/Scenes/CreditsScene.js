/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-new */
/* eslint-disable func-names */

import Phaser from 'phaser';
import Button from '../Components/button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    const madeByText = this.add.text(0, 0, 'Created By: Bereket A, Beshane \nMade With: Phaser 3.5, Javascript ES6\nGithub: @Berabjesus', {
      fontSize: '26px',
      fill: '#fff',
    });

    const zone = this.add.zone(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height);
    Phaser.Display.Align.In.Center(
      creditsText,
      zone,
    );

    Phaser.Display.Align.In.Center(
      madeByText,
      zone,
    );

    madeByText.setY(1000);

    this.tweens.add({
      targets: creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
    });

    this.tweens.add({
      targets: madeByText,
      y: -200,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      onComplete: function () {
        this.scene.start('Menu');
      }.bind(this),
    });

    new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', 'Menu', {
      x: 0.7,
      y: 0.7,
    });
  }
}