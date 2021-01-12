/* eslint-disable no-undef */

import PreloaderScene from '../src/Scenes/PreloaderScene';

test('PreloaderScene is a subclass of Phaser.Scene', () => {
  expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});