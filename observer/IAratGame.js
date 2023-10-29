class Game {
  constructor() {
    this.rats = [];
  }

  addRat(rat) {
    this.rats.push(rat);
    this.notifyRats();
  }

  removeRat(rat) {
    const index = this.rats.indexOf(rat);
    if (index !== -1) {
      this.rats.splice(index, 1);
    }
    this.notifyRats();
  }

  notifyRats() {
    for (const rat of this.rats) {
      rat.updateAttack();
    }
  }
}

class Rat {
  constructor(game) {
    this.game = game;
    this.attack = 1;
    game.addRat(this);
  }

  updateAttack() {
    this.attack = this.game.rats.length;
  }

  die() {
    this.game.removeRat(this);
  }
}

// Sample Test
const game = new Game();
const rat = new Rat(game);
const rat2 = new Rat(game);
console.log(rat.attack);
console.log(rat2.attack);
