class Pockemon {
  public name: string
  public attack: number
  public health: number

  constructor(name: string, attack: number, health: number) {
    this.name = name;
    this.attack = attack;
    this.health = health;
  }
}

abstract class CardGame {
  protected creatures: Pockemon[]

  constructor(creatures: Pockemon[]) {
    this.creatures = creatures;
  }

  abstract hit(attacker: Pockemon, defender: Pockemon): void;
  
  combat(creature1index: number, creature2index: number) {
    const first = this.creatures[creature1index];
    const second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    const firstAlive = first.health > 0;
    const secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return "tie";
    return firstAlive ? this.creatures[creature1index].name : this.creatures[creature2index].name
  }
}

class TemporaryCardDamageGame extends CardGame {
  constructor(creatures: Pockemon[]) {
    super(creatures);
  }

  hit(attacker: Pockemon, defender: Pockemon) {
    if (attacker.attack >= defender.health) {
      defender.health = 0;
    }
  }
}

class PermanentCardDamageGame extends CardGame {
  constructor(creatures: Pockemon[]) {
    super(creatures);
  }

  hit(attacker: Pockemon, defender: Pockemon) {
    defender.health = Math.max(0, defender.health - attacker.attack);
  }
}

const c1 = new Pockemon("pickashu", 1, 2);
const c2 = new Pockemon("charmander", 1, 3);
const gamePockemon = new TemporaryCardDamageGame([c1, c2]);
console.log(gamePockemon.combat(0, 1));
console.log(gamePockemon.combat(0, 1));

const c12 = new Pockemon("pickashu", 1, 2);
const c22 = new Pockemon("charmander", 1, 3);
const gamePockemon2 = new PermanentCardDamageGame([c12, c22]);
console.log(gamePockemon2.combat(0, 1));
console.log(gamePockemon2.combat(0, 1));
