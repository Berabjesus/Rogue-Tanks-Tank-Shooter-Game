import IntroScene from '../src/Scenes/IntroScene';

test('IntroScene is a subclass of Phaser.Scene', () => {
  expect(IntroScene).toBeSubclassOf(Phaser.Scene);
});