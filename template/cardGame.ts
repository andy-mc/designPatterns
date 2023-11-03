class Pokemon {
  public name: string;
  public attack: number;
  private _health: number;

  constructor(name: string, attack: number, health: number) {
    this.name = name;
    this.attack = attack;
    this._health = health;
  }

  get health(): number {
    return this._health;
  }

  takeDamage(damage: number): void {
    this._health = Math.max(0, this._health - damage);
  }

  increaseHealth(health: number): void {
    this._health = health;
  }
}

abstract class CardGame {
  protected creatures: Pokemon[]

  constructor(creatures: Pokemon[]) {
    this.creatures = creatures;
  }

  abstract hit(attacker: Pokemon, defender: Pokemon): void;

  combat(creature1index: number, creature2index: number): string {
    const first = this.creatures[creature1index];
    const second = this.creatures[creature2index];
    this.hit(first, second);
    this.hit(second, first);
    const firstAlive = first.health > 0;
    const secondAlive = second.health > 0;
    if (firstAlive === secondAlive) return "tie";
    return firstAlive ? first.name : second.name;
  }
}

class TemporaryCardDamageGame extends CardGame {
  hit(attacker: Pokemon, defender: Pokemon): void {
    const originalHealth = defender.health;
    defender.takeDamage(attacker.attack);
    if (defender.health <= 0) {
      defender.increaseHealth(originalHealth);
    }
  }
}

class PermanentCardDamageGame extends CardGame {
  hit(attacker: Pokemon, defender: Pokemon): void {
    defender.takeDamage(attacker.attack);
  }
}

const c1 = new Pokemon("pickashu", 1, 2);
const c2 = new Pokemon("charmander", 1, 3);
const gamePokemon = new TemporaryCardDamageGame([c1, c2]);
console.log(gamePokemon.combat(0, 1));
console.log(gamePokemon.combat(0, 1));

const c12 = new Pokemon("pickashu", 1, 2);
const c22 = new Pokemon("charmander", 1, 3);
const gamePokemon2 = new PermanentCardDamageGame([c12, c22]);
console.log(gamePokemon2.combat(0, 1));
console.log(gamePokemon2.combat(0, 1));
