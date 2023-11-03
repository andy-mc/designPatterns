class Creature {
  constructor(attack, health) {
    this._id = Math.random();
    this.attack = attack;
    this.health = health;
    this.alive = this.health > 0;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
    }
  }
}

class Game {
  constructor(damageStrategy) {
    this.damageStrategy = damageStrategy;
  }

  springTrapOn(creature) {
    this.damageStrategy.damage(creature);
    return creature.alive;
  }
}

class DamageStrategy {
  damage(creature) {}
}

class ConstantDamageStrategy extends DamageStrategy {
  damage(creature) {
    creature.takeDamage(1);
  }
}

class GrowingDamageStrategy extends DamageStrategy {
  constructor() {
    super();
    this.damageByCreature = {};
  }

  damage(creature) {
    if (!this.damageByCreature[creature._id]) {
      this.damageByCreature[creature._id] = 0;
    }
    this.damageByCreature[creature._id] += 1;
    creature.takeDamage(this.damageByCreature[creature._id]); 
  }
}

const game = new Game(new GrowingDamageStrategy());
const creature = new Creature(1, 10);
console.log("creature.health:", creature.health);
game.springTrapOn(creature);
console.log("creature.health:", creature.health);
console.log("creature.health:", creature.alive);
game.springTrapOn(creature);
console.log("creature.health:", creature.health);
console.log("creature.health:", creature.alive);
