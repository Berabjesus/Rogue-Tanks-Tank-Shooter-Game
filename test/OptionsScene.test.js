/* eslint-disable no-undef */

import OptionsScene from '../src/Scenes/OptionsScene.js';

test('OptionsScene is a subclass of Phaser.Scene', () => {
  expect(OptionsScene).toBeSubclassOf(Phaser.Scene);
});