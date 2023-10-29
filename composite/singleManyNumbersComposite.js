class CompositeValue {
  constructor() {
    this.values = [];
  }

  totalValues() {
    return this.values.reduce((total, currentValue) => total + currentValue, 0);
  }
}

class SingleValue extends CompositeValue {
  constructor(value) {
    super();
    this.values.push(value);
  }
}

class ManyValues extends CompositeValue {
  push(value) {
    this.values.push(value);
  }
}

let sum = function (containers) {
  return containers.reduce((total, item) => total + item.totalValues(), 0);
};

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);
console.log(sum([singleValue, otherValues]));
