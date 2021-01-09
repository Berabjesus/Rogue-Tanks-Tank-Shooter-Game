import 'phaser';
import madeBy from '../Assets/misc/me-min.png'
import gameLogo from '../Assets/misc/taklogo.png'
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('madeBy', madeBy)
    this.load.image('gameLogo', gameLogo)
  }
 
  create () {
    this.scene.start('Preloader')
  }
};