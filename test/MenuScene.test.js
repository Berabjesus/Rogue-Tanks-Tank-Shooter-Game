/* eslint-disable no-undef */

import MenuScene from '../src/Scenes/MenuScene';

test('MenuScene is a subclass of Phaser.Scene', () => {
  expect(MenuScene).toBeSubclassOf(Phaser.Scene);
});