class Creature {
  public readonly _id: number;
  public alive: Boolean;

  constructor(private attack: number, private _health: number) {
    this._id = Math.random();
    this.alive = this._health > 0;
  }

  get health() {
    return this._health;
  }

  takeDamage(damage: number) {
    this._health -= damage;
    if (this._health <= 0) {
      this._health = 0;
      this.alive = false;
    }
  }
}

abstract class DamageStrategy {
  abstract damage(creature: Creature): void;
}

class Game {
  constructor(private damageStrategy: DamageStrategy) {}

  springTrapOn(creature: Creature) {
    this.damageStrategy.damage(creature);
    return creature.alive;
  }
}

class ConstantDamageStrategy extends DamageStrategy {
  damage(creature: Creature) {
    creature.takeDamage(1);
  }
}

class GrowingDamageStrategy extends DamageStrategy {
  private damageByCreature: { [creatureId: number]: number };

  constructor() {
    super();
    this.damageByCreature = {};
  }

  damage(creature: Creature) {
    if (!this.damageByCreature[creature._id]) {
      this.damageByCreature[creature._id] = 0;
    }
    this.damageByCreature[creature._id] += 1;
    creature.takeDamage(this.damageByCreature[creature._id]); 
  }
}

const game = new Game(new GrowingDamageStrategy());
const creature = new Creature(1, 3);
console.log("creature.health:", creature.health);
game.springTrapOn(creature);
console.log("creature.health:", creature.health);
console.log("creature.health:", creature.alive);
game.springTrapOn(creature);
console.log("creature.health:", creature.health);
console.log("creature.health:", creature.alive);
