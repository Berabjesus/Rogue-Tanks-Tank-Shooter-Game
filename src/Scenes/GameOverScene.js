import 'phaser';
import Button from '../components/button';
import Api from '../components/api';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const tombstone = this.add.image(350, 60, 'tombstone').setOrigin(0, 0);
    const score = this.sys.game.globals.score + 10;
    const {
      player
    } = this.sys.game.globals;

    const ripText = this.add.text(570, 140, '', {
      font: '36px',
      fill: '#000000',
    });
    ripText.setStroke('#000', 4);
    ripText.setShadow(2, 2, '#333333', 2, true, true);
    ripText.setText(['RIP']);

    const text = this.add.text(455, 185, '', {
      font: '22px',
      fill: '#000000',
    });
    text.setStroke('#000', 2);
    text.setShadow(1, 1, '#333333', 1, true, true);

    text.setText([
      `Here lies our great \nsoldier ${player} who died \nfighting the enemy.\n${player}  Got ${score} points\n, including 10 bonus \npoints for playing.`,
    ]);

    new Button(this, 300, 510, 'normalButton', 'hoverButton', 'Restart', 'Game');

    new Button(this, 900, 510, 'normalButton', 'hoverButton', 'Rest In Peace', 'Menu');

    Api.post(player, parseInt(score, 10))
      .then(result => {
        this.add.text(20, 20, `${result.statusText}- Status: ${result.status}`, {
          font: '24px',
          fill: '#ffffff',
        });
      })
      .catch(error => {
        this.add.text(20, 20, `Score not uploaded, ${error}`, {
          font: '24px',
          fill: '#ffffff',
        });
      });
  }
}