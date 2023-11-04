// Se define una interfaz para garantizar que todas las expresiones implementen la función print.
interface Expression {
  print(buffer: string[]): void;
}

// NumberExpression implementa la interfaz Expression.
class NumberExpression implements Expression {
  constructor(private value: number) {}

  print(buffer: string[]): void {
    buffer.push(this.value.toString());
  }
}

// Addition también implementa la interfaz Expression.
class Addition implements Expression {
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
class PrintableExpression {
  constructor(private root: Expression) {}

  toString(): string {
    const buffer: string[] = [];
    this.root.print(buffer);
    return buffer.join('');
  }
}

// Crear una nueva instancia de PrintableExpression con la estructura de la expresión.
const expression = new PrintableExpression(
  new Addition(
    new NumberExpression(1), 
    new Addition(
      new NumberExpression(2), 
      new NumberExpression(3)
    )
  )
);

// Usar el método toString() para obtener y mostrar la representación de la expresión.
console.log(expression.toString());
