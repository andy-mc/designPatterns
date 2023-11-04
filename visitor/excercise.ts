interface IExpression {
  accept(visitor: ExpressionVisitor): void;
}

interface ExpressionVisitor {
  visitInteger(value: Integer): void;
  visitAddition(ae: AddExpression): void;
  visitMultiplication(me: MultiplicationExpression): void;
}

class Integer implements IExpression {
  constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  accept(visitor: ExpressionVisitor) {
    visitor.visitInteger(this);
  }
}

abstract class BinaryExpression implements IExpression {
  constructor(protected lhs: IExpression, protected rhs: IExpression) {}

  getLhs() {
    return this.lhs;
  }

  getRhs() {
    return this.rhs;
  }

  abstract accept(visitor: ExpressionVisitor): void;
}

class AddExpression extends BinaryExpression {
  accept(visitor: ExpressionVisitor) {
    visitor.visitAddition(this);
  }
}

class MultiplicationExpression extends BinaryExpression {
  accept(visitor: ExpressionVisitor) {
    visitor.visitMultiplication(this);
  }
}

class ExpressionPrinter implements ExpressionVisitor {
  private buffer: string[] = [];

  visitInteger(value: Integer) {
    this.buffer.push(value.value.toString());
  }

  visitAddition(ae: AddExpression) {
    this.buffer.push("(");
    ae.getLhs().accept(this);
    this.buffer.push("+");
    ae.getRhs().accept(this);
    this.buffer.push(")");
  }

  visitMultiplication(me: MultiplicationExpression) {
    const needParenthesisLhs = me.getLhs() instanceof AddExpression;
    const needParenthesisRhs = me.getRhs() instanceof AddExpression;

    if (needParenthesisLhs) this.buffer.push("(");
    me.getLhs().accept(this);
    if (needParenthesisLhs) this.buffer.push(")");

    this.buffer.push("*");

    if (needParenthesisRhs) this.buffer.push("(");
    me.getRhs().accept(this);
    if (needParenthesisRhs) this.buffer.push(")");
  }

  toString() {
    return this.buffer.join("");
  }
}

const simple = new AddExpression(new Integer(2), new Integer(3));
const ep = new ExpressionPrinter();
simple.accept(ep);
console.log(ep.toString());

const compound = new MultiplicationExpression(new Integer(2), simple);
const ep2 = new ExpressionPrinter();
compound.accept(ep2);
console.log(ep2.toString());
