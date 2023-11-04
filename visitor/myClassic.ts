abstract class VisitorExpression {
  abstract visitNumberExpressionTS(e: NumberExpressionTS): void;
  abstract visitAdditionExpression(e: AdditionExpression): void;
}

abstract class ExpressionTS {
  abstract accept(visitor: VisitorExpression): void;
}

class NumberExpressionTS {
  constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  accept(visitor: VisitorExpression) {
    visitor.visitNumberExpressionTS(this);
  }
}

class AdditionExpression {
  constructor(private _left: ExpressionTS, private _right: ExpressionTS) {}

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  accept(visitor: VisitorExpression) {
    visitor.visitAdditionExpression(this);
  }
}

class PrinterExpression extends VisitorExpression {
  private buffer: string[] = [];

  visitNumberExpressionTS(e: NumberExpressionTS) {
    this.buffer.push(e.value.toString());
  }

  visitAdditionExpression(e: AdditionExpression) {
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
  private result = 0;

  visitNumberExpressionTS(e: NumberExpressionTS) {
    this.result = e.value;
  }

  visitAdditionExpression(e: AdditionExpression) {
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
  new NumberExpressionTS(1),
  new AdditionExpression(new NumberExpressionTS(2), new NumberExpressionTS(3)),
);

const pe = new PrinterExpression();
pe.visitAdditionExpression(e);

const ce = new CalculateExpression();
ce.visitAdditionExpression(e);

console.log(`${pe.toString()} = ${ce.toString()}`);
