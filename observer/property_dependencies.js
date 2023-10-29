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

  fire(sender, args) {
    this.handlers.forEach((handler) => handler(sender, args));
  }
}

class PropertyChangedArgs {
  constructor(name, newValue) {
    this.name = name;
    this.newValue = newValue;
  }
}

class Person {
  constructor(age) {
    this._age = age;
    this.property_changed = new Event();
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (!value || this._age === value) {
      return;
    }

    const oldCanVote = this.canVote;

    this._age = value;
    this.property_changed.fire(this, new PropertyChangedArgs("age", value));

    if (oldCanVote !== this.canVote) {
      this.property_changed.fire(
        this,
        new PropertyChangedArgs("canVote", this.canVote),
      );
    }
  }

  get canVote() {
    return this._age >= 16;
  }
}

class VotingChecker {
  constructor(person) {
    this.person = person;
    this.person.property_changed.subscribe(this.voting_changed.bind(this));
  }

  voting_changed(sender, args) {
    if (sender === this.person && args.name === "canVote") {
      console.log(`Voting status changed to ${args.newValue}`);
    }
  }
}

const person = new Person("John");
// eslint-disable-next-line no-unused-vars
const checker = new VotingChecker(person);
for (let i = 14; i < 18; ++i) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}
