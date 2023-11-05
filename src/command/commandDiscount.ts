// interface IDiscountStrategy {
//   applyDiscount(price: number): number;
// }

// class DiscountByPercentage implements IDiscountStrategy {
//   constructor(private discountRate: number) {}

//   applyDiscount(price: number): number {
//     return price - (price * this.discountRate);
//   }
// }

// class DiscountCommand {
//   constructor(private discountStrategy: IDiscountStrategy) {}

//   execute(price: number): number {
//     return this.discountStrategy.applyDiscount(price);
//   }
// }

// const discountCommand = new DiscountCommand(new DiscountByPercentage(0.10));
// console.log(`Discounted price: $${discountCommand.execute(1000)}`);
