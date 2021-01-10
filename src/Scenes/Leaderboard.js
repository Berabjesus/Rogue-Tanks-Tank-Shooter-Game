import 'phaser'
import Api from '../components/api'

export default class LeaderboardScene extends Phaser.Scene {
  constructor(){
    super('Leaderboard')
  }

  create(){
    const dom = document.createElement('table')
    const headercontainer = document.createElement('tr')
    const header1 = document.createElement('th')
    header1.innerText = 'Player Name'
    const header2 = document.createElement('th')
    header2.innerText = 'Player Score'
    headercontainer.append(header1, header2)

    dom.append(headercontainer)

    // for (let i = 0; i < 5; i++) {
    //   const row = document.createElement('tr')
    //   const data1 = document.createElement('td')
    //   data1.innerText = 'Player ' + (i+1)
    //   const data2 = document.createElement('td')
    //   data2.innerText = 'score ' + i*10
    //   row.append(data1, data2)

    //   dom.append(row)
    // }
    Api.get()
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error);
    })
    const element = this.add.dom(600, 300, dom)
  }
}