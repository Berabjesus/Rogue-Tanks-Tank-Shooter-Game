import Button from '../src/Components/button';

test('Button is a subclass of Phaser.GameObjects.Container', () => {
  expect(Button).toBeSubclassOf(Phaser.GameObjects.Container);
});