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
    this.step = 1;
    this.steps = [{ step: this.step, m }];
  }

  deposit(amount) {
    this.balance += amount;
    const m = new MementoInstanceOnTime(this.balance);
    this.step += 1;
    this.steps.push({ step: this.step, m });
  }

  undo() {
    if (this.step > 0) {
      this.step--;
      this.balance = this.steps[this.step].m.balance;
    }
  }

  redo() {
    if (this.step < this.steps.length - 1) {
      this.step++;
      this.balance = this.steps[this.step].m.balance;
    }
  }

  toString() {
    return `Balance: $${this.balance}`;
  }
}

const ba = new BankAccount(100);
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

const accountState_1 = ba.deposit(50);
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.deposit(100);
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.undo();
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.undo();
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.redo();
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.deposit(3);
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.deposit(3);
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.undo();
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);

ba.undo();
console.log(ba.toString());
console.log(ba.steps);
console.log(ba.step);
