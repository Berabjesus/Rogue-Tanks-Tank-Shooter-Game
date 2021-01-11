/* eslint-disable import/no-unresolved */

import Phaser from 'phaser';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  create() {
    const text = this.add.text(450, 200, 'Please enter your name!', {
      color: 'white',
      fontSize: '20px ',
    });
    const dom = document.createElement('div');
    const input = document.createElement('input');
    input.name = 'nameField';
    input.placeholder = 'Enter your name';
    const button = document.createElement('input');
    button.type = 'button';
    button.name = 'playButton';
    button.value = "Let's Play";

    dom.append(input, button);

    const element = this.add.dom(600, 0, dom);

    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'playButton') {
        const inputText = element.getChildByName('nameField');
        this.sys.game.globals.player = inputText.value;
        if (inputText.value !== '') {
          element.removeListener('click');
          element.setVisible(false);
          this.scene.start('Menu');
        } else {
          element.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}