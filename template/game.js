class Creature {
  constructor(attack, health) {
    this.attack = attack;
    this.health = health;
  }
}

class CardGame {
  constructor(creatures) {
    this.creatures = creatures;
  }

  // returns index of winner if there's a winner
  // returns -1 if there's no winner (both alive or both dead)
  combat(creature1index, creature2index) {
    const first = this.creatures[creature1index];
    const second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    const firstAlive = first.health > 0;
    const secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return "tie";
    return firstAlive ? creature1index : creature2index;
  }
}

class TemporaryCardDamageGame extends CardGame {
  hit(attacker, defender) {
    if (attacker.attack >= defender.health) {
      defender.health = 0;
    }
  }
}

class PermanentCardDamageGame extends CardGame {
  hit(attacker, defender) {
    defender.health = Math.max(0, defender.health - attacker.attack);
  }
}

const c1 = new Creature(1, 2);
const c2 = new Creature(1, 3);
const game = new TemporaryCardDamageGame([c1, c2]);
console.log(game.combat(0, 1));
console.log(game.combat(0, 1));

const c12 = new Creature(1, 2);
const c22 = new Creature(1, 3);
const game2 = new PermanentCardDamageGame([c12, c22]);
console.log(game2.combat(0, 1));
console.log(game2.combat(0, 1));
