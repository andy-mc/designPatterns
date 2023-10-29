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
    this.handlers.forEach((v, k) => v(sender, args));
  }

  fireIndividual(idx, sender, args) {
    this.handlers.get(idx)(sender, args);
  }
}

class Person {
  constructor(name) {
    this.id = null;
    this.name = name;
    this.chatLog = [];
  }

  receive(sender, message) {
    let s = `${sender}: '${message}'`;
    this.chatLog.push(s);
    console.log(`[${this.name}'s chat session] ${s}`);
  }

  say(message) {
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    this.room.message(this.id, who, message);
  }
}

class ChatRoom {
  constructor() {
    this.event = new Event();
    this.people = [];
  }

  broadcast(source, message) {
    this.event.fire(source, message);
  }

  join(person) {
    person.room = this;
    person.id = this.event.subscribe(person.receive.bind(person));
    this.people.push(person);
    let joinMsg = `${person.name} joins the chat`;
    this.broadcast("room", joinMsg);
  }

  message(source, destination, message) {
    for (let p of this.people)
      if (p.name === destination)
        this.event.fireIndividual(p.id, source, message);
  }
}

const andy = new Person("Andy");
const luigy = new Person("Luigy");

const chatroom = new ChatRoom();
chatroom.join(andy);
chatroom.join(luigy);

andy.say("Hi, Everyone !!");
luigy.say("Nice to meet you everyone !!");

luigy.pm("Andy", "Nanito te amo !!");
