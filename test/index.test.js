/* eslint-disable no-undef */

import Game from '../src/index';

test('Game is a subclass of Phaser.Game', () => {
  expect(Game).toBeSubclassOf(Phaser.Game);
});