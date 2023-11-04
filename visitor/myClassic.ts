abstract class VisitorExpression {
  abstract visitNumberExpression(e: NumberExpressionTS): void;
  abstract visitAdditionExpression(e: AdditionExpression): void;
}

abstract class ExpressionTS {
  abstract accept(visitor: VisitorExpression): void;
}

// Asegurar que NumberExpressionTS hereda de ExpressionTS.
class NumberExpressionTS extends ExpressionTS {
  constructor(private _value: number) {
    super();
  }

  get value() {
    return this._value;
  }

  accept(visitor: VisitorExpression) {
    visitor.visitNumberExpression(this);
  }
}

// Asegurar que AdditionExpression hereda de ExpressionTS.
class AdditionExpression extends ExpressionTS {
  constructor(private _left: ExpressionTS, private _right: ExpressionTS) {
    super();
  }

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

// PrinterExpression ahora tiene un método de entrada público.
class PrinterExpression extends VisitorExpression {
  private buffer: string[] = [];

  visitNumberExpression(e: NumberExpressionTS) {
    this.buffer.push(e.value.toString());
  }

  visitAdditionExpression(e: AdditionExpression) {
    this.buffer.push("(");
    e.left.accept(this);
    this.buffer.push("+");
    e.right.accept(this);
    this.buffer.push(")");
  }

  private toString(): string {
    return this.buffer.join("");
  }

  // Método de entrada para iniciar la impresión.
  print(e: ExpressionTS): string {
    e.accept(this);
    return this.toString();
  }
}

// CalculateExpression ahora maneja adecuadamente el estado.
class CalculateExpression extends VisitorExpression {
  private resultStack: number[] = [];

  visitNumberExpression(e: NumberExpressionTS) {
    this.resultStack.push(e.value);
  }

  visitAdditionExpression(e: AdditionExpression) {
    e.left.accept(this);
    e.right.accept(this);
    const right: number  = this.resultStack.pop() || 0;
    const left: number = this.resultStack.pop() || 0;
    this.resultStack.push(left + right);
  }

  // Método de entrada para iniciar el cálculo.
  calculate(e: ExpressionTS): number {
    e.accept(this);
    return this.resultStack.pop() || 0;
  }
}

// 1 + (2 + 3)
const e = new AdditionExpression(
  new NumberExpressionTS(1),
  new AdditionExpression(new NumberExpressionTS(2), new NumberExpressionTS(3)),
);

const pe = new PrinterExpression();
const ce = new CalculateExpression();

console.log(`${pe.print(e)} = ${ce.calculate(e)}`);
