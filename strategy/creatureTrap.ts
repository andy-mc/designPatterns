class Creature {
  private static readonly _idGenerator = function* () {
    let id = 1;
    while (true) yield id++;
  }();

  public readonly id: number;
  private _health: number;
  public alive: Boolean;

  constructor(private _attack: number, health: number) {
    this.id = Creature._idGenerator.next().value;
    this._health = health;
    this.alive = this._health > 0;
  }

  get attack() {
    return this._attack;
  }

  get health() {
    return this._health;
  }

  takeDamage(damage: number) {
    this._health = Math.max(0, this._health - damage);
    this.alive = this._health > 0;
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
  private damageByCreature: Map<number, number> = new Map();

  damage(creature: Creature): void {
    const currentDamage = this.damageByCreature.get(creature.id) || 0;
    const newDamage = currentDamage + 1;
    this.damageByCreature.set(creature.id, newDamage);
    creature.takeDamage(newDamage); 
  }
}

const game = new Game(new GrowingDamageStrategy());
const game2 = new Game(new ConstantDamageStrategy());
const creature = new Creature(1, 3);
const creature2 = new Creature(1, 3);
console.log("creature.health:", creature.health);
console.log("creature2.health:", creature2.health);
game.springTrapOn(creature);
game2.springTrapOn(creature2);
console.log("creature 1", creature.health);
console.log("creature 1", creature.alive);
console.log("creature 2", creature2.health);
console.log("creature 2", creature2.alive);
game.springTrapOn(creature);
game2.springTrapOn(creature2);
console.log("creature 1", creature.health);
console.log("creature 1", creature.alive);
console.log("creature 2", creature2.health);
console.log("creature 2", creature2.alive);
