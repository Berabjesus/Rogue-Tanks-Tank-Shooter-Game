import Phaser from 'phaser';
import './SCSS/main.scss';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import InputScene from './Scenes/GetInputScene';
import MenuScene from './Scenes/MenuScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import LeaderboardScene from './Scenes/Leaderboard';
import IntroScene from './Scenes/IntroScene';
import GameScene from './Scenes/GameScene';
import GameOverScene from './Scenes/GameOverScene';
import AudioModel from './utils/audio-status';

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