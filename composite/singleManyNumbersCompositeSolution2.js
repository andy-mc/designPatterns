class SingleValue {
  constructor(value) {
    this.value = value; // Almacenamos el valor en la propiedad 'value'
  }

  total() {
    return this.value; // La suma de un SingleValue es solo el valor que contiene
  }
}

class ManyValues extends Array {
  // Extendemos Array para aprovechar sus métodos
  total() {
    return this.reduce((a, b) => a + b, 0); // La suma de ManyValues es la suma de todos sus valores
  }
}

let sum = function (containers) {
  return containers.reduce((a, b) => a + b.total(), 0); // Usamos el método sum() de cada objeto y los sumamos todos
};

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);
console.log(sum([singleValue, otherValues]));
