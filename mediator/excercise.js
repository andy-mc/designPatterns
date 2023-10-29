class Mediator {
  constructor() {
    this.participants = [];
  }

  broadcast(sender, value) {
    this.participants.forEach((p) => {
      if (p !== sender) {
        p.value += value;
      }
    });
  }
}

class Participant {
  constructor(mediator) {
    this.mediator = mediator;
    this.value = 0;
    this.mediator.participants.push(this);
  }

  say(n) {
    this.mediator.broadcast(this, n);
  }
}

const mediator = new Mediator();
const p1 = new Participant(mediator);
const p2 = new Participant(mediator);

console.log(p1.value);
console.log(p2.value);
p1.say(2);
console.log(p1.value);
console.log(p2.value);
p2.say(4);
console.log(p1.value);
console.log(p2.value);
p1.say(6);
console.log(p1.value);
console.log(p2.value);
