import 'phaser';
import './SCSS/main.scss';
import config from './Config/config.js';
import BootScene from './Scenes/BootScene.js';
import PreloaderScene from './Scenes/PreloaderScene.js';
import InputScene from './Scenes/GetInputScene.js';
import MenuScene from './Scenes/MenuScene.js';
import OptionsScene from './Scenes/OptionsScene.js';
import CreditsScene from './Scenes/CreditsScene.js';
import LeaderboardScene from './Scenes/Leaderboard.js';
import IntroScene from './Scenes/IntroScene.js';
import GameScene from './Scenes/GameScene.js';
import GameOverScene from './Scenes/GameOverScene.js';
import AudioModel from './utils/audio-status.js';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new AudioModel();
    this.globals = {
      model,
      bgMusic: null,
      player: '',
      score: 0,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Input', InputScene);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();