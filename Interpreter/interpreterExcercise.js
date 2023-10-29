class ExpressionProcessor {
  constructor() {
    this.variables = {}; // This will hold the 'price tags' for our single-letter variables.
  }

  // Method to calculate the value of the expression
  calculate(expression) {
    let total = 0;
    let currentNumber = "";
    let currentOperator = 1; // 1 for addition, -1 for subtraction

    for (let i = 0; i < expression.length; i++) {
      let currentChar = expression[i];

      // If it's a number, add it to the currentNumber string
      if (/\d/.test(currentChar)) {
        currentNumber += currentChar;
      }
      // If it's a single-letter variable
      else if (/[a-zA-Z]/.test(currentChar) && currentChar.length === 1) {
        if (this.variables[currentChar] !== undefined) {
          total += currentOperator * this.variables[currentChar];
        } else {
          return 0; // Item not in price list
        }
        currentNumber = ""; // Reset current number
      }
      // If it's a '+' or '-' operator
      else if (currentChar === "+") {
        total +=
          currentOperator * (currentNumber ? parseInt(currentNumber) : 0);
        currentOperator = 1;
        currentNumber = "";
      } else if (currentChar === "-") {
        total +=
          currentOperator * (currentNumber ? parseInt(currentNumber) : 0);
        currentOperator = -1;
        currentNumber = "";
      }
      // Any other character we ignore and return 0
      else {
        return 0;
      }
    }

    // Don't forget the last number (if any)
    if (currentNumber) {
      total += currentOperator * parseInt(currentNumber);
    }

    return total;
  }
}

// Example usage
const processor = new ExpressionProcessor();
processor.variables["a"] = 3;
processor.variables["b"] = 5;

console.log(processor.calculate("a-4+b")); // Output should be 8
// console.log(processor.calculate("a-b")); // Output should be -2
// console.log(processor.calculate("c+a")); // Output should be 0 because 'c' is not in variablesx/
