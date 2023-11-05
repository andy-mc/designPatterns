// Primero, definimos la interfaz Observer.
interface Observer {
  update(discountedPrice: number): void;
}

// Luego, definimos la clase DiscountApplication que informará a los Observers.
class DiscountApplication {
  private observers: Observer[] = [];

  applyDiscount(price: number, discountRate: number): number {
    const discountedPrice = price - (price * discountRate);
    for (const observer of this.observers) {
      observer.update(discountedPrice);
    }
    return discountedPrice;
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }
}

// Ahora, incluimos las implementaciones concretas de los Observers.
class InventorySystem implements Observer {
  update(discountedPrice: number) {
    console.log(`El sistema de inventario ha sido notificado sobre el nuevo precio con descuento: $${discountedPrice}`);
  }
}

class AccountingSystem implements Observer {
  update(discountedPrice: number) {
    console.log(`El sistema de contabilidad ha sido notificado sobre el nuevo precio con descuento: $${discountedPrice}`);
  }
}

class NotificationSystem implements Observer {
  update(discountedPrice: number) {
    console.log(`El sistema de notificaciones ha informado a los clientes sobre el nuevo precio con descuento: $${discountedPrice}`);
  }
}

// Ejemplo de uso
const discountApp = new DiscountApplication();
const inventorySystem = new InventorySystem();
const accountingSystem = new AccountingSystem();
const notificationSystem = new NotificationSystem();

// Agregar observadores
discountApp.addObserver(inventorySystem);
discountApp.addObserver(accountingSystem);
discountApp.addObserver(notificationSystem);

// Aplicar un descuento y notificar a los observadores
discountApp.applyDiscount(1000, 0.2); // Aplica un 20% de descuento a un precio de $1000
