interface IDiscountStrategy {
    getDiscount(price: number): number;
}

class DiscountByPercentage implements IDiscountStrategy {
    constructor(private discount: number) {}
    getDiscount(price: number): number {
      return price - (price * (this.discount / 100));
    }
}

class DiscountHalfPrice implements IDiscountStrategy {
    getDiscount(price: number): number {
      return price / 2;
    }
}

class Product {
    constructor(
      private _name: string, 
      private _price: number,
      private discountStrategy: IDiscountStrategy
    ) { }
    
    get name (): string {
      return this._name;
    }

    get price (): number {
      return this._price;
    }

    get getDiscount (): number {
      return this.discountStrategy.getDiscount(this._price);
    }
}

const discount10Percent = new DiscountByPercentage(15);
const discountHalfPrice = new DiscountHalfPrice();

const product = new Product('Laptop', 100, discount10Percent);
console.log(product.getDiscount);
const productB = new Product('Laptop', 100, discountHalfPrice);
console.log(productB.getDiscount);
