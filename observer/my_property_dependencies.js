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
    this.property_changed_event = new Event();
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
    this.property_changed_event.fire(
      this,
      new PropertyChangedArgs("age", value),
    );

    if (oldCanVote !== this.canVote) {
      this.property_changed_event.fire(
        this,
        new PropertyChangedArgs("canVote", this.canVote),
      );
    }
  }

  get canVote() {
    return this._age >= 16;
  }
}

const person = new Person(14);
for (let i = 14; i < 18; ++i) {
  console.log(`Changing age to ${i}`);
  person.age = i;
}
