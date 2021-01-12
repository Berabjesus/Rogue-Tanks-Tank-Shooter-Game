/* eslint-disable no-undef */

import TankTools from '../src/Components/TankTools';

test('TankTools is a subclass of Phaser.Physics.Arcade.Sprite', () => {
  expect(TankTools).toBeSubclassOf(Phaser.Physics.Arcade.Sprite);
});