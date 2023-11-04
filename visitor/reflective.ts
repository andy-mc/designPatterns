// Se define una interfaz para garantizar que todas las expresiones implementen la función print.
interface Expression {
  print(buffer: string[]): void;
}

// NumberExpression implementa la interfaz Expression.
class NumberExpressionR implements Expression {
  constructor(private value: number) {}

  print(buffer: string[]): void {
    buffer.push(this.value.toString());
  }
}

// AdditionR también implementa la interfaz Expression.
class AdditionR implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  print(buffer: string[]): void {
    buffer.push("(");
    this.left.print(buffer);
    buffer.push("+");
    this.right.print(buffer);
    buffer.push(")");
  }
}

// Implementar un método toString() para imprimir directamente la expresión.
class PrintableExpressionR {
  constructor(private root: Expression) {}

  toString(): string {
    const buffer: string[] = [];
    this.root.print(buffer);
    return buffer.join('');
  }
}

// Crear una nueva instancia de PrintableExpressionR con la estructura de la expresión.
const expressionR = new PrintableExpressionR(
  new AdditionR(
    new NumberExpressionR(1), 
    new AdditionR(
      new NumberExpressionR(2), 
      new NumberExpressionR(3)
    )
  )
);

// Usar el método toString() para obtener y mostrar la representación de la expresión.
console.log(expressionR.toString());
