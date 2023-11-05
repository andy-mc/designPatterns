interface IProduct {
  getPrice(): number;
}

class Product implements IProduct {
  constructor(private _name: string, private _basePrice: number) {}

  get name(): string {
    return this._name;
  }

  getPrice(): number {
    return this._basePrice;
  }
}

class DiscountDecorator implements IProduct {
  constructor(private product: IProduct, private discountRate: number) {}

  getPrice(): number {
    const price = this.product.getPrice();
    return price - (price * this.discountRate);
  }
}

const baseProduct = new Product('Laptop', 1000);
const discountedProduct = new DiscountDecorator(baseProduct, 0.10);
console.log(`${baseProduct.name}: $${discountedProduct.getPrice()}`); // Laptop: $900
