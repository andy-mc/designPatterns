class Game {
  constructor() {
    this.rats = new Map();
    this.count = 0;
  }

  addRat(rat) {
    this.rats.set(++this.count, rat);
    return this.count;
  }

  removeRat(ratToken) {
    this.rats.delete(ratToken);
  }

  get ratNumber() {
    return this.rats.size;
  }
}

class Rat {
  constructor(game) {
    this.game = game;
    this.ratToken = this.game.addRat(this);
  }

  get attack() {
    return this.game.ratNumber;
  }

  die() {
    this.game.removeRat(this.ratToken);
  }
}

const game = new Game();
const rat = new Rat(game);
const rat2 = new Rat(game);
const rat3 = new Rat(game);
rat3.die();
console.log("rat.attack:", rat.attack);
// console.log("rat2.attack:", rat2.attack);
