// Interfaz común para todas las estrategias de pago
interface PaymentStrategy {
  processPayment(amount: number): void;
}

// Estrategia concreta para el pago con tarjeta de crédito
class CreditCardPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Processing credit card payment for amount: ${amount}`);
    // Aquí iría la lógica para procesar el pago con tarjeta de crédito
  }
}

// Estrategia concreta para el pago con PayPal
class PayPalPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Processing PayPal payment for amount: ${amount}`);
    // Aquí iría la lógica para procesar el pago con PayPal
  }
}

// Estrategia concreta para el pago con criptomonedas
class CryptoPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Processing cryptocurrency payment for amount: ${amount}`);
    // Aquí iría la lógica para procesar el pago con criptomonedas
  }
}

// Clase que representa un checkout de pago en una tienda
class CheckoutSystem {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  processOrder(amount: number) {
    this.strategy.processPayment(amount);
  }
}

// Ejemplo de uso del sistema de pagos
const amountToPay = 100;
const checkout = new CheckoutSystem(new CreditCardPaymentStrategy());
checkout.processOrder(amountToPay); // Procesando el pago con tarjeta de crédito

checkout.setPaymentStrategy(new PayPalPaymentStrategy());
checkout.processOrder(amountToPay); // Procesando el pago con PayPal

checkout.setPaymentStrategy(new CryptoPaymentStrategy());
checkout.processOrder(amountToPay); // Procesando el pago con criptomonedas
