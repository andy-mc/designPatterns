class Integer {
  constructor(value) {
    this.value = value;
  }

  accept(visitor) {
    visitor.visitValue(this);
  }
}

class BinaryExpression {
  constructor(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
  }
}

class AdditionExpression extends BinaryExpression {
  accept(visitor) {
    visitor.visitAddition(this);
  }
}

class MultiplicationExpression extends BinaryExpression {
  accept(visitor) {
    visitor.visitMultiplication(this);
  }
}

class ExpressionPrinter {
  constructor() {
    this.buffer = [];
  }

  visitValue(value) {
    this.buffer.push(value.value);
  }

  visitAddition(ae) {
    this.buffer.push("(");
    ae.lhs.accept(this);
    this.buffer.push("+");
    ae.rhs.accept(this);
    this.buffer.push(")");
  }

  visitMultiplication(me) {
    me.lhs.accept(this);
    this.buffer.push("*");
    me.rhs.accept(this);
  }

  toString() {
    return this.buffer.join("");
  }
}

const simple = new AdditionExpression(new Integer(2), new Integer(3));
const ep = new ExpressionPrinter();
ep.visitAddition(simple);
console.log(ep.toString());

const me = new MultiplicationExpression(new Integer(2), simple);
const ep2 = new ExpressionPrinter();
ep2.visitMultiplication(me);
console.log(ep2.toString());
