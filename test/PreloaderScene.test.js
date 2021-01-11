/* eslint-disable no-undef */

import PreloaderScene from '../src/Scenes/PreloaderScene.js';

test('PreloaderScene is a subclass of Phaser.Scene', () => {
  expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});