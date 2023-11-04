class NumberExpression {
  constructor(value) {
    this.value = value;
  }
}

class AdditionExpression {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

class PrinterExpression {
  print(expression, buffer) {
    if (expression instanceof NumberExpression) {
      buffer.push(expression.value.toString());
    } else if (expression instanceof AdditionExpression) {
      buffer.push("(");
      this.print(expression.left, buffer);
      buffer.push("+");
      this.print(expression.right, buffer);
      buffer.push(")");
    }
  }
}

// 1 + (2+3)
const e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3)),
);

const pe = new PrinterExpression();
const buffer = [];
pe.print(e, buffer);
console.log(buffer.join(" "));
