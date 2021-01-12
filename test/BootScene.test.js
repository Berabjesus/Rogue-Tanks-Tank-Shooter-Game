/* eslint-disable no-undef */

import BootScene from '../src/Scenes/BootScene';

test('BootScene is a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});