// interface IValidationStrategy {
//   validate(value: string): boolean;
//   getErrorMessage(): string;
// }

// // Implementar una estrategia de validación para el correo electrónico.
// class EmailValidationStrategy implements IValidationStrategy {
//   validate(value: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(value);
//   }

//   getErrorMessage(): string {
//     return 'Please enter a valid email address.';
//   }
// }

// // Implementar una estrategia de validación para contraseñas.
// class PasswordValidationStrategy implements IValidationStrategy {
//   validate(value: string): boolean {
//     // La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     return passwordRegex.test(value);
//   }

//   getErrorMessage(): string {
//     return 'Password must be at least 8 characters long and include a number and an uppercase letter.';
//   }
// }

// // Implementar una estrategia de validación para un campo de texto genérico.
// class TextValidationStrategy implements IValidationStrategy {
//   validate(value: string): boolean {
//     // Puede ser una validación tan simple como verificar que no está vacío.
//     return value.trim().length > 0;
//   }

//   getErrorMessage(): string {
//     return 'This field cannot be empty.';
//   }
// }

// // Clase de formulario que utiliza estrategias de validación.
// class FormField {
//   private strategy: IValidationStrategy;
//   private value: string;

//   constructor(strategy: IValidationStrategy, value: string) {
//     this.strategy = strategy;
//     this.value = value;
//   }

//   validate(): boolean {
//     return this.strategy.validate(this.value);
//   }

//   getErrorMessage(): string {
//     if (!this.validate()) {
//       return this.strategy.getErrorMessage();
//     }
//     return '';
//   }
// }

// // Uso de las estrategias de validación en un formulario.
// let emailField = new FormField(new EmailValidationStrategy(), 'userexample.com');
// let passwordField = new FormField(new PasswordValidationStrategy(), 'Password123');
// let textField = new FormField(new TextValidationStrategy(), '');

// console.log(emailField.validate()); // true or false
// console.log(emailField.getErrorMessage()); // Error message if invalid

// // console.log(passwordField.validate()); // true or false
// // console.log(passwordField.getErrorMessage()); // Error message if invalid

// // console.log(textField.validate()); // true or false
// // console.log(textField.getErrorMessage()); // Error message if invalid
