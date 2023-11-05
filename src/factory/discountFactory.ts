// interface Discount {
//   applyDiscount(price: number): number;
// }

// class DiscountByPercentage implements Discount {
//   constructor(private discountRate: number) {}

//   applyDiscount(price: number): number {
//     return price - (price * this.discountRate);
//   }
// }

// class DiscountHalfPrice implements Discount {
//   applyDiscount(price: number): number {
//     return price / 2;
//   }
// }

// interface Product {
//   name: string;
//   basePrice: number;
//   getDiscount(): number;
// }

// class Product implements Product {
//   constructor(
//     public name: string, 
//     public basePrice: number,
//     private discountStrategy: Discount
//   ) { }
  
//   getDiscount(): number {
//     return this.discountStrategy.applyDiscount(this.basePrice);
//   }
// }

// class ProductFactory {
//   static createProduct(name: string, basePrice: number, discountType: 'tenPercent' | 'halfPrice'): Product {
//     switch (discountType) {
//       case 'tenPercent':
//         return new Product(name, basePrice, new DiscountByPercentage(0.10));
//       case 'halfPrice':
//         return new Product(name, basePrice, new DiscountHalfPrice());
//       default:
//         return new Product(name, basePrice, { applyDiscount: (price: number) => price });
//     }
//   }
// }

// const productC = ProductFactory.createProduct('Laptop', 1000, 'halfPrice');
// console.log(`${productC.name}: $${productC.getDiscount()}`);
