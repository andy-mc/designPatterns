// abstract class ProductWithDiscount {
//   protected basePrice: number;

//   constructor(basePrice: number) {
//     this.basePrice = basePrice;
//   }

//   protected abstract calculateDiscount(): number;

//   getPriceAfterDiscount(): number {
//     return this.basePrice - this.calculateDiscount();
//   }
// }

// class TenPercentDiscountProduct extends ProductWithDiscount {
//   calculateDiscount(): number {
//     return this.basePrice * 0.1;
//   }
// }

// class HalfPriceDiscountProduct extends ProductWithDiscount {
//   calculateDiscount(): number {
//     return this.basePrice * 0.5;
//   }
// }

// // Crear instancias de productos con diferentes descuentos
// let tenPercentProduct = new TenPercentDiscountProduct(1000);
// console.log(`Precio con 10% de descuento: $${tenPercentProduct.getPriceAfterDiscount()}`);

// let halfPriceProduct = new HalfPriceDiscountProduct(1000);
// console.log(`Precio con 50% de descuento: $${halfPriceProduct.getPriceAfterDiscount()}`);
