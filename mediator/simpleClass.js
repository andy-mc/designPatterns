class Circulo {
  constructor(radio) {
    this._radio = radio; // el guion bajo generalmente indica que es una variable "privada" o no destinada al acceso directo
  }

  // Método para obtener el valor del radio
  get radio() {
    return this._radio;
  }

  // Método para establecer el valor del radio
  set radio(valor) {
    if (valor < 0) {
      console.log("El radio no puede ser negativo");
    } else {
      this._radio = valor;
    }
  }

  // Método para calcular el área
  calcularArea() {
    return Math.PI * this._radio * this._radio;
  }
}

const miCirculo = new Circulo(5);
miCirculo._radio = -1; // Esto no debería ser posible
console.log(miCirculo.calcularArea()); // 78.53981633974483
