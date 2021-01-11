/* eslint-disable max-len */

import 'phaser';
import Button from '../Components/button.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(this.cameras.main.width / 2, this.cameras.main.height / 2 - offset * 100, this.cameras.main.width, this.cameras.main.height),
    );
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.bgMusic = this.sys.game.globals.bgMusic;
    if (this.model.musicOn === true && !this.model.bgMusicPlaying) {
      if (this.model.musicPaused) { this.bgMusic.resume(); } else { this.bgMusic.play(); }
      this.model.bgMusicPlaying = true;
    }

    this.gameButton = new Button(this, 100, 200, 'normalButton', 'hoverButton', 'Play', 'Intro',{
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.gameButton, 1.2);

    this.optionsButton = new Button(this, 300, 200, 'normalButton', 'hoverButton', 'Options', 'Options',{
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.optionsButton);

    this.creditsButton = new Button(this, 300, 200, 'normalButton', 'hoverButton', 'Credits', 'Credits',{
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.creditsButton, -1.2);

    this.leaderboardButton = new Button(this, 300, 200, 'normalButton', 'hoverButton', 'Top 10 Players', 'Leaderboard',{
      x: 0.7,
      y: 0.7,
    });
    this.centerButton(this.leaderboardButton, -2.4);

    const info = this.add.text(750, 30, '', {
      font: '16px',
      fill: '#ffffff',
    });

    info.setText([
      'Info: If you experience lag,\nPlease enable hardware acceleration on\nyour Browser. On Chrome For Example:\nChrome Menu > Settings > Advanced. \nUnder System, enable \'Use hardware\nacceleration when available\'',
    ]);
  }
}