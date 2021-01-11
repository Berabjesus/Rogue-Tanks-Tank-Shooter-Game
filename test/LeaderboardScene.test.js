/* eslint-disable no-undef */

import LeaderboardScene from '../src/Scenes/Leaderboard';

test('LeaderboardScene is a subclass of Phaser.Scene', () => {
  expect(LeaderboardScene).toBeSubclassOf(Phaser.Scene);
});