import InputScene from '../src/Scenes/GetInputScene';

test('InputScene is a subclass of Phaser.Scene', () => {
  expect(InputScene).toBeSubclassOf(Phaser.Scene);
});