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
    this.propertyChanged = new Event();
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (!value || this._age === value) return;
    this._age = value;
    this.propertyChanged.fire(this, new PropertyChangedArgs("age", value));
  }
}

class RegistrationChecker {
  constructor(person) {
    this.person = person;
    this.token = person.propertyChanged.subscribe(this.age_changed.bind(this));
  }

  age_changed(sender, args) {
    if (sender === this.person && args.name === "age") {
      if (args.newValue < 13) {
        console.log(`Sorry, you are still to young to register`);
      } else {
        console.log(`Congrats, you are old enough to register`);
        sender.propertyChanged.unsubscribe(this.token);
      }
    }
  }
}

class LicenseChecker {
  constructor(person) {
    this.person = person;
    this.token = person.propertyChanged.subscribe(this.age_changed.bind(this));
  }

  age_changed(sender, args) {
    if (sender === this.person && args.name === "age") {
      if (args.newValue < 16) {
        console.log(`Sorry, you are still to young to drive`);
      } else {
        console.log(`Congrats, you are old enough to drive`);
        sender.propertyChanged.unsubscribe(this.token);
      }
    }
  }
}

const person = new Person(10);
const checker = new RegistrationChecker(person);
const licenseChecker = new LicenseChecker(person);

// person.age = 13;
// person.age = 14;
// person.age = 17;
person.age = 15;
person.age = 19;
