/* eslint-disable no-undef */

import CreditsScene from '../src/Scenes/CreditsScene.js';

test('CreditsScene is a subclass of Phaser.Scene', () => {
  expect(CreditsScene).toBeSubclassOf(Phaser.Scene);
});