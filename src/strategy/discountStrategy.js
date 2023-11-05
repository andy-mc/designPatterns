// // Estrategias de descuento
// // componente de bajo nivel
// class DiscountStrategy {
//   constructor(discountRate) {
//     this.discountRate = discountRate;
//   }

//   applyDiscount(price) {
//     return price - price * this.discountRate;
//   }
// }

// class DiscountStrategyHalfPrice {
//   applyDiscount(price) {
//     return price / 2;
//   }
// }

// // componente de alto nivel
// class Product {
//   constructor(name, price, discountStrategy) {
//     this.name = name;
//     this.price = price;
//     this.discountStrategy = discountStrategy;
//   }

//   getPriceWithDiscount() {
//     return this.discountStrategy.applyDiscount(this.price);
//   }
// }

// // Uso del patrón Strategy
// // Ahora podemos crear instancias de DiscountStrategy para diferentes tipos de descuento
// const discount10Percent = new DiscountStrategy(0.1);
// const discountHalfPrice = new DiscountStrategyHalfPrice();

// const productA = new Product("Producto A", 100, discount10Percent);
// console.log(productA.getPriceWithDiscount()); // 90, aplicando el 10% de descuento

// const productB = new Product("Producto B", 100, discountHalfPrice);
// console.log(productB.getPriceWithDiscount()); // 80, aplicando el 20% de descuento
