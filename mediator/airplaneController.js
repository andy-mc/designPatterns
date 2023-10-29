// Mediator
class AirTrafficController {
  constructor() {
    this._planes = [];
  }

  register(plane) {
    this._planes.push(plane);
    plane.atc = this;
  }

  requestLanding(plane) {
    if (this._planes.filter((p) => p.isLanding).length == 0) {
      console.log(`ATC: El avión ${plane.name} tiene permiso para aterrizar.`);
      plane.isLanding = true;
    } else {
      console.log(`ATC: El avión ${plane.name} debe esperar para aterrizar.`);
    }
  }
}

// Airplane
class Airplane {
  constructor(name) {
    this.name = name;
    this.atc = null;
    this.isLanding = false;
  }

  land() {
    if (this.atc) {
      this.atc.requestLanding(this);
    } else {
      console.log(`El avión ${this.name} no tiene un ATC asignado.`);
    }
  }

  parking() {
    this.isLanding = false;
    console.log(`El avión ${this.name} aterrizó y se estacionó.`);
  }
}

// Ejemplo de uso
const atc = new AirTrafficController();

const plane1 = new Airplane("Plane1");
const plane2 = new Airplane("Plane2");

atc.register(plane1);
atc.register(plane2);

plane1.land();
plane2.land();

plane1.parking();
plane2.land();
