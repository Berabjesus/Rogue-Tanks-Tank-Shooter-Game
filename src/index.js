import 'phaser';
import './SCSS/main.scss';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import MenuScene from './Scenes/MenuScene'
import OptionsScene from './Scenes/OptionsScene'
import CreditsScene from './Scenes/CreditsScene'
import IntroScene from './Scenes/IntroScene'
import GameScene from './Scenes/GameScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: 'null'};
    this.scene.add('Boot', BootScene)
    this.scene.add('Preloader', PreloaderScene)
    this.scene.add('Menu', MenuScene)
    this.scene.add('Options', OptionsScene)
    this.scene.add('Credits',CreditsScene )
    this.scene.add('Intro',IntroScene )
    this.scene.add('Game', GameScene)
    this.scene.start('Boot');
  }
}

window.game = new Game();