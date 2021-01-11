import Game from '../src/index.js';

test('Game is a subclass of Phaser.Game', () => {
  expect(Game).toBeSubclassOf(Phaser.Game);
});