// // Estado abstracto que define la interfaz para aplicar descuentos
// interface DiscountState {
//   applyDiscount(price: number): number;
// }

// // Estado concreto para un descuento regular
// class RegularDiscountState implements DiscountState {
//   private discountRate: number = 0.10; // 10% de descuento

//   applyDiscount(price: number): number {
//     return price - (price * this.discountRate);
//   }
// }

// // Estado concreto para un descuento promocional
// class PromotionalDiscountState implements DiscountState {
//   private discountRate: number = 0.20; // 20% de descuento

//   applyDiscount(price: number): number {
//     return price - (price * this.discountRate);
//   }
// }

// // Estado concreto para ningún descuento
// class NoDiscountState implements DiscountState {
//   applyDiscount(price: number): number {
//     return price; // Sin descuento
//   }
// }

// // La clase Producto que cambia su comportamiento basado en su estado de descuento
// class Product {
//   private discountState: DiscountState;

//   constructor(private name: string, private basePrice: number) {
//     this.discountState = new NoDiscountState(); // Estado inicial
//   }

//   // Método para cambiar el estado de descuento
//   setDiscountState(state: DiscountState) {
//     this.discountState = state;
//   }

//   // Método para aplicar el descuento según el estado actual
//   getPriceAfterDiscount(): number {
//     return this.discountState.applyDiscount(this.basePrice);
//   }
// }

// // Uso del patrón State
// const product = new Product('Laptop', 1000);

// // Aplicar descuento regular
// product.setDiscountState(new RegularDiscountState());
// console.log(`Precio después del descuento regular: $${product.getPriceAfterDiscount()}`); // $900

// // Cambiar al descuento promocional
// product.setDiscountState(new PromotionalDiscountState());
// console.log(`Precio después del descuento promocional: $${product.getPriceAfterDiscount()}`); // $800

// // Quitar todos los descuentos
// product.setDiscountState(new NoDiscountState());
// console.log(`Precio sin descuento: $${product.getPriceAfterDiscount()}`); // $1000
