class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  emit(sender, args) {
    this.handlers.forEach(function (handler) {
      handler(sender, args);
    });
  }
}

const WhatToQuery = Object.freeze({
  attack: 1,
  defense: 2,
  Globlin: "Globlin",
  GloblinKing: "GloblinKing",
});

class Query {
  constructor(creatureName, whatToQuery, value) {
    this.creatureName = creatureName;
    this.whatToQuery = whatToQuery;
    this.value = value;
  }
}

class Modifier {
  constructor(creature, game) {
    this.game = game;
    this.creature = creature;
    this.token = this.game.event.subscribe(this.handle.bind(this));
  }

  handle(sender, query) {
    // do nothing
  }
}

class GoblingKingModifier extends Modifier {
  constructor(creature, game) {
    super(creature, game);
  }

  handle(sender, query) {
    if (
      query.creatureName === WhatToQuery.Globlin &&
      query.whatToQuery === WhatToQuery.attack
    ) {
      query.value = query.value + 1;
    }
  }
}

class GoblingModifier extends Modifier {
  constructor(creature, game) {
    super(creature, game);
  }

  handle(sender, query) {
    if (query.whatToQuery === WhatToQuery.defense) {
      query.value = this.game._goblinsCount;
    }
  }
}
class Goblin {
  constructor(game, baseAttack = 1, baseDefense = 1) {
    this.name = WhatToQuery.Globlin;
    this.game = game;
    this.initial_attack = baseAttack;
    this.initial_defense = baseDefense;
    this.game.addGoblin();
    new GoblingModifier(this, game);
  }

  get attack() {
    let q = new Query(this.name, WhatToQuery.attack, this.initial_attack);
    this.game.performQuery(this, q);
    return q.value;
  }

  get defense() {
    let q = new Query(this.name, WhatToQuery.defense, this.initial_defense);
    this.game.performQuery(this, q);
    return q.value;
  }
}

class GoblinKing extends Goblin {
  constructor(game) {
    super(game, 3, 3);
    this.name = WhatToQuery.GloblinKing;
    new GoblingKingModifier(this, game);
  }
}

class Game {
  constructor() {
    this.event = new Event();
    this._goblinsCount = 0;
  }

  performQuery(sender, query) {
    this.event.emit(sender, query);
  }

  addGoblin() {
    this._goblinsCount += 1;
  }
}

let game = new Game();
let goblin = new Goblin(game);
let goblin2 = new Goblin(game);
let goblin3 = new Goblin(game);

let goblinKing = new GoblinKing(game);
