class Memento {
  constructor(balance) {
    this.balance = balance;
  }
}

class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
    this.changes = [new Memento(balance)];
    this.current = 0;
  }

  deposit(amount) {
    this.balance += amount;
    let m = new Memento(this.balance);
    this.changes.push(m);
    this.current = this.changes.length - 1;
    return m;
  }

  restore(m) {
    if (m) {
      this.balance = m.balance;
      this.changes.push(m);
      this.current = this.changes.length - 1;
    }
  }

  undo() {
    if (this.current > 0) {
      let m = this.changes[--this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  redo() {
    if (this.current + 1 < this.changes.length) {
      let m = this.changes[++this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  toString() {
    return `Balance: $${this.balance}`;
  }
}

const ba = new BankAccount(100);
console.log(ba.toString());
console.log(ba.current);

const accountState_1 = ba.deposit(50);
console.log(ba.toString());
console.log(ba.current);

ba.deposit(100);
console.log(ba.toString());
console.log(ba.current);

ba.undo();
console.log(ba.toString());
console.log(ba.current);

ba.undo();
console.log(ba.toString());
console.log(ba.current);

ba.redo();
console.log(ba.toString());
console.log(ba.current);

ba.deposit(3);
console.log(ba.toString());
console.log(ba.current);

ba.deposit(3);
console.log(ba.toString());
console.log(ba.current);

ba.undo();
console.log(ba.toString());
console.log(ba.current);

ba.undo();
console.log(ba.toString());
console.log(ba.current);
