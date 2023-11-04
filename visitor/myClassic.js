class NumberExpression {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitNumberExpression(this);
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  accept(visitor) {
    visitor.visitAdditionExpression(this);
  }
}

class VisitorExpression {}

class PrinterExpression extends VisitorExpression {
  constructor() {
    super();
    this.buffer = [];
  }

  visitNumberExpression(e) {
    this.buffer.push(e.value.toString());
  }

  visitAdditionExpression(e) {
    this.buffer.push("(");
    e.left.accept(this);
    this.buffer.push("+");
    e.right.accept(this);
    this.buffer.push(")");
  }

  toString() {
    return this.buffer.join("");
  }
}

class CalculateExpression extends VisitorExpression {
  constructor() {
    super();
    this.result = 0;
  }

  visitNumberExpression(e) {
    this.result = e.value;
  }

  visitAdditionExpression(e) {
    e.left.accept(this);
    const temp = this.result;
    e.right.accept(this);
    this.result += temp;
  }

  toString() {
    return this.result.toString();
  }
}

// 1 + (2+3)
const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3)),
);

const pe = new PrinterExpression();
pe.visitAdditionExpression(e);

const ce = new CalculateExpression();
ce.visitAdditionExpression(e);

console.log(`${pe.toString()} = ${ce.toString()}`);
