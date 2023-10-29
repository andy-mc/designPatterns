class MementoInstanceOnTime {
  static _id = 0;
  constructor(balance) {
    this._id = MementoInstanceOnTime._id++;
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    const m = new MementoInstanceOnTime(balance);
    this.mementos = { [m._id]: m };

    this.history = [m];
    this.currentMomento = m;
  }

  deposit(amount) {
    this.balance += amount;
    const m = new MementoInstanceOnTime(this.balance);
    this.history.push(m);
    this.currentMomento = m;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      const m = new MementoInstanceOnTime(this.balance);
      this.history.push(m);
      this.currentMomento = m;
    }
    return false;
  }

  restore(m) {
    if (m) {
      this.balance = m.balance;
      const m = new MementoInstanceOnTime(this.balance);
      this.history.push(m);
      this.currentMomento = m;
    }
    return null;
  }

  undo() {
    if (this.currentMomento._id > 0) {
      const currentMomentoIndex = this.history.findIndex(
        (m) => m._id === this.currentMomento._id,
      );
      const previousMomento = this.history[currentMomentoIndex - 1];
      this.balance = previousMomento.balance;
      this.currentMomento = previousMomento;
    }
  }

  redo() {
    if (this.currentMomento._id < this.history.length - 1) {
      const currentMomentoIndex = this.history.findIndex(
        (m) => m._id === this.currentMomento._id,
      );
      const nextMomento = this.history[currentMomentoIndex + 1];
      this.balance = nextMomento.balance;
      this.currentMomento = nextMomento;
    }
  }

  toString() {
    return `Balance: $${this.balance}`;
  }
}

const ba = new BankAccount(100);
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

const accountState_1 = ba.deposit(50);
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.deposit(100);
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.undo();
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.undo();
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.redo();
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.deposit(3);
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.deposit(3);
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.undo();
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);

ba.undo();
console.log(ba.toString());
console.log(ba.history);
console.log(ba.currentMomento);
