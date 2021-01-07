import 'phaser'

export default class Path{
  constructor(graphics){
    this._graphics = graphics
    this._graphics.lineStyle(5, 0x000000, 5);
    this._graphics.fillStyle(0x00ff00, 1);
    this.test = '123123123'
    this._pathOne()
    this._pathTwo()
    this._pathThree()
  }

  _draw(path) {
    path.draw(this._graphics, 64)
  }

  _pathOne(){
    this._pathOne = new Phaser.Curves.Path(80, 80)
    this._pathOne.lineTo(new Phaser.Math.Vector2(650, 80))
    this._pathOne.lineTo(new Phaser.Math.Vector2(650, 1000));
    this._pathOne.lineTo(new Phaser.Math.Vector2(80, 1000));
    this._pathOne.lineTo(new Phaser.Math.Vector2(80, 1520));
    this._pathOne.lineTo(new Phaser.Math.Vector2(650, 1520));
    this._pathOne.lineTo(new Phaser.Math.Vector2(650, 2190));
    this._pathOne.lineTo(new Phaser.Math.Vector2(80, 2190));
    this._pathOne.lineTo(new Phaser.Math.Vector2(80, 80));
    this._draw(this._pathOne)
    this._pathOne.points = {x:80, y:80}
  }

  _pathTwo() {
    this._pathTwo = new Phaser.Curves.Path(650, 80)
    this._pathTwo.lineTo(new Phaser.Math.Vector2(1180, 80))
    this._pathTwo.lineTo(new Phaser.Math.Vector2(1180, 1000));
    this._pathTwo.lineTo(new Phaser.Math.Vector2(650, 1000));
    this._pathTwo.lineTo(new Phaser.Math.Vector2(650, 1520));
    this._pathTwo.lineTo(new Phaser.Math.Vector2(1180, 1520));
    this._pathTwo.lineTo(new Phaser.Math.Vector2(1180, 80))
    this._pathTwo.lineTo(new Phaser.Math.Vector2(80, 80))
    this._draw(this._pathTwo)
    this._pathTwo.points = {x:650, y:80}
  }

  _pathThree() {
    this._pathThree = new Phaser.Curves.Path(650, 2190)
    this._pathThree.lineTo(new Phaser.Math.Vector2(1180, 2190))
    // this._pathThree.lineTo(new Phaser.Math.Vector2(1180, 1000));
    // this._pathThree.lineTo(new Phaser.Math.Vector2(650, 1000));
    // this._pathThree.lineTo(new Phaser.Math.Vector2(650, 1520));
    // this._pathThree.lineTo(new Phaser.Math.Vector2(1180, 1520));
    // this._pathThree.lineTo(new Phaser.Math.Vector2(1180, 80))
    // this._pathThree.lineTo(new Phaser.Math.Vector2(80, 80))
    this._draw(this._pathThree)
    this._pathThree.points = {x:650, y:80}
  }


  get pathOne() {
    return this._pathOne;
  }
  get pathTwo(){
    return this._pathTwo
  }
  get pathThree(){
    return this._pathThree
  }
}
