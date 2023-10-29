class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    for (let observer of this.observers) {
      observer.update(data);
    }
  }
}

class Observer {
  update(data) {
    console.log(`Observer notified with data: ${data}`);
  }
}

// Uso:
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("New data available!");
