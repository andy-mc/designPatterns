// interface IDiscountStrategy {
//   applyDiscount(price: number): number;
// }

// class DiscountByPercentage implements IDiscountStrategy {
//   constructor(private discountRate: number) {}

//   applyDiscount(price: number): number {
//     return price - (price * this.discountRate);
//   }
// }

// class DiscountHalfPrice implements IDiscountStrategy {
//   applyDiscount(price: number): number {
//     return price / 2;
//   }
// }

// class Product {
//   constructor(
//     private _name: string, 
//     private _basePrice: number,
//     private discountStrategy: IDiscountStrategy
//   ) { }
  
//   get name(): string {
//     return this._name;
//   }

//   get basePrice(): number {
//     return this._basePrice;
//   }

//   get priceAfterDiscount(): number {
//     return this.discountStrategy.applyDiscount(this._basePrice);
//   }
// }

// const tenPercentDiscount = new DiscountByPercentage(0.10); // 10% descuento como 0.10
// const halfPriceDiscount = new DiscountHalfPrice();

// const product = new Product('Laptop', 1000, tenPercentDiscount);
// console.log(`${product.name}: $${product.priceAfterDiscount}`); // Laptop: $900

// const productB = new Product('Laptop', 1000, halfPriceDiscount);
// console.log(`${productB.name}: $${productB.priceAfterDiscount}`); // Laptop: $500
