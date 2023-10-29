class Broker {
  constructor() {
    this._handlers = new Map();
    this.count = 0;
  }

  addHandler(handler) {
    this.count += 1;
    this._handlers.set(this.count, handler);
    return this.count;
  }

  removeHandler(handlerIndex) {
    this._handlers.delete(handlerIndex);
  }

  emit(sender, query) {
    this._handlers.forEach(function (handler) {
      handler(sender, query);
    });
  }
}

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

const WhatToQuery = Object.freeze({
  attack: 1,
  defense: 2,
});

class Modifier {
  constructor(broker, creature) {
    this.creature = creature;
    this.brokerIndex = broker.addHandler(this.handle.bind(this));
  }

  handle(sender, query) {}

  dispose() {
    this.broker.removeHandler(this.brokerIndex);
  }
}

class attackModifier extends Modifier {
  constructor(broker, creature) {
    super(broker, creature);
  }

  handle(sender, query) {
    if (
      query.creatureName === this.creature.name &&
      query.whatToQuery === WhatToQuery.attack
    ) {
      query.value += 2;
    }
  }
}

class defenseModifier extends Modifier {
  constructor(broker, creature) {
    super(broker, creature);
  }

  handle(sender, query) {
    if (
      query.creatureName === this.creature.name &&
      query.whatToQuery === WhatToQuery.defense
    ) {
      query.value += 2;
    }
  }
}

class Creature {
  constructor(broker, name, attack, defense) {
    this.broker = broker;
    this.name = name;
    this.initial_attack = attack;
    this.initial_defense = defense;
  }

  get attack() {
    let q = new Query(this.name, WhatToQuery.attack, this.initial_attack);
    this.broker.emit(this, q);
    return q.value;
  }

  get defense() {
    let q = new Query(this.name, WhatToQuery.defense, this.initial_defense);
    this.broker.emit(this, q);
    return q.value;
  }

  toString() {
    return `${this.name}: (${this.attack}/${this.defense})`;
  }
}

const broker = new Broker();
const pikachu = new Creature(broker, "Pikachu", 1, 1);
const bulbasaur = new Creature(broker, "Bulbasaur", 1, 1);
console.log("pikachu:", pikachu.toString());
console.log("bulbasaur:", bulbasaur.toString());

const attackModifierPikachu = new attackModifier(broker, pikachu);
console.log("pikachu:", pikachu.toString());
console.log("bulbasaur:", bulbasaur.toString());

const defenseModifierBulbasaur = new defenseModifier(broker, bulbasaur);
console.log("pikachu:", pikachu.toString());
console.log("bulbasaur:", bulbasaur.toString());
