import LeaderboardScene from '../src/Scenes/Leaderboard.js';

test('LeaderboardScene is a subclass of Phaser.Scene', () => {
  expect(LeaderboardScene).toBeSubclassOf(Phaser.Scene);
});