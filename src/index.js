import 'phaser';
import './scss/main.scss';
import config from './config/config';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import InputScene from './scenes/GetInputScene'
import MenuScene from './scenes/MenuScene'
import OptionsScene from './scenes/OptionsScene'
import CreditsScene from './scenes/CreditsScene'
import IntroScene from './scenes/IntroScene'
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene'
import AudioModel from './components/audio-status';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new AudioModel();
    this.globals = {
      model,
      bgMusic: null,
      player: '',
      score: 0
    };
    this.scene.add('Boot', BootScene)
    this.scene.add('Preloader', PreloaderScene)
    this.scene.add('Input', InputScene)
    this.scene.add('Menu', MenuScene)
    this.scene.add('Options', OptionsScene)
    this.scene.add('Credits', CreditsScene)
    this.scene.add('Intro', IntroScene)
    this.scene.add('Game', GameScene)
    this.scene.add('GameOver', GameOverScene)
    this.scene.start('Boot');
  }
}

window.game = new Game();