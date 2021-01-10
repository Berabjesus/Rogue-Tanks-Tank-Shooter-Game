import 'phaser';
import Api from '../components/api';
import Button from '../components/button';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    const dom = document.createElement('table');
    const headercontainer = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.innerText = 'Player Name';
    const header2 = document.createElement('th');
    header2.innerText = 'Player Score';
    headercontainer.append(header1, header2);

    dom.append(headercontainer);
    Api.get()
      .then(result => {
        const arrayOfusers = result.result;
        const sorted = arrayOfusers.sort((a, b) => b.score - a.score);

        for (let i = 0; i < sorted.length; i++) {
          if (i >= 10) {
            break;
          }
          const row = document.createElement('tr');
          const data1 = document.createElement('td');
          data1.innerText = arrayOfusers[i].user;
          const data2 = document.createElement('td');
          data2.innerText = arrayOfusers[i].score;
          row.append(data1, data2);
          dom.append(row);
        }
      })
      .catch(error => {
        dom.innerText = error;
      });
    const element = this.add.dom(600, 100, dom);

    new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', 'Menu', {
      x: 0.7,
      y: 0.7,
    });
  }
}