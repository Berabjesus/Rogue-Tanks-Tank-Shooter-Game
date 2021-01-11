/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

import Path from '../src/Components/paths';

describe('Path methods', () => {
  const graphics = {};
  graphics.lineStyle = jest.fn();
  graphics.fillStyle = jest.fn();
  graphics.lineBetween = jest.fn();
  const path = new Path(graphics);

  it('should return an obejct with paths as properties', () => {
    expect(typeof path.getAllPaths()).toBe('object');
  });

  it('should check path one is instance of Phaser.Curves.Path', () => {
    expect(path._pathOne).toBeInstanceOf(Phaser.Curves.Path);
  });

  it('should check path two is instance of Phaser.Curves.Path', () => {
    expect(path._pathTwo).toBeInstanceOf(Phaser.Curves.Path);
  });

  it('should check path thre is instance of Phaser.Curves.Path', () => {
    expect(path._pathThree).toBeInstanceOf(Phaser.Curves.Path);
  });

  it('should check path four is instance of Phaser.Curves.Path', () => {
    expect(path._pathFour).toBeInstanceOf(Phaser.Curves.Path);
  });
});