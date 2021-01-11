/* eslint-disable no-undef */

import Enemy from '../src/Components/Enemy';

test('Enemy is a subclass of Phaser.GameObjects.PathFollower', () => {
  expect(Enemy).toBeSubclassOf(Phaser.GameObjects.PathFollower);
});