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

class VisitorExpression {
  constructor() {
    this.buffer = [];
  }
}

class PrinterExpression extends VisitorExpression {
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

// 1 + (2+3)
const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3)),
);

const pe = new PrinterExpression();
pe.visitAdditionExpression(e);
console.log(pe.toString());
