export default class AudioModel {
  constructor() {
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._musicPaused = false;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set musicPaused(bool) {
    this._musicPaused = bool;
  }

  get musicPaused() {
    return this._musicPaused;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}