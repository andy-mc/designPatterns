// class AreaCalculator {
//   calculate(shape) {
//     if (shape.type === 'circle') {
//       return Math.PI * shape.radius * shape.radius;
//     } else if (shape.type === 'square') {
//       return shape.side * shape.side;
//     } else if (shape.type === 'triangle') {
//       return (shape.base * shape.height) / 2;
//     }
//   }
// }

// const circle = { type: 'circle', radius: 5 };
// const square = { type: 'square', side: 4 };
// const triangle = { type: 'triangle', base: 4, hiqht: 3 };

// const calculator = new AreaCalculator();
// console.log(calculator.calculate(circle)); // Área del círculo
// console.log(calculator.calculate(square)); // Área del cuadrado
// console.log(calculator.calculate(triangle)); // Área del triangulo

class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Square {
  constructor(side) {
    this.side = side;
  }

  area() {
    return this.side * this.side;
  }
}

class Triangle {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }

  area() {
    return (this.base * this.height) / 2;
  }
}

class AreaCalculator {
  calculate(shape) {
    return shape.area();
  }
}

const circle = new Circle(5);
const square = new Square(4);
const triangle = new Triangle(6, 5);

const calculator = new AreaCalculator();
console.log(calculator.calculate(circle)); // Área del círculo
console.log(calculator.calculate(square)); // Área del cuadrado
console.log(calculator.calculate(triangle)); // Área del cuadrado
