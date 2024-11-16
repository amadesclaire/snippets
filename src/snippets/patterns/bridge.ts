// Implementor Interface for Payment Methods
interface PaymentMethod {
  processPayment(amount: number): void;
}

// Concrete Implementor for Credit Card Payment
class CreditCardPayment implements PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processing a credit card payment of $${amount}`);
  }
}

// Concrete Implementor for PayPal Payment
class PayPalPayment implements PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processing a PayPal payment of $${amount}`);
  }
}

// Abstraction for Purchase Types
abstract class Purchase {
  protected paymentMethod: PaymentMethod;

  constructor(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  abstract makePurchase(amount: number): void;
}

// Refined Abstraction for Subscription Purchase
class SubscriptionPurchase extends Purchase {
  makePurchase(amount: number): void {
    console.log("Processing subscription purchase...");
    this.paymentMethod.processPayment(amount);
    console.log("Subscription purchase complete.");
  }
}

// Refined Abstraction for One-time Purchase
class OneTimePurchase extends Purchase {
  makePurchase(amount: number): void {
    console.log("Processing one-time purchase...");
    this.paymentMethod.processPayment(amount);
    console.log("One-time purchase complete.");
  }
}

// Client code
const creditCard = new CreditCardPayment();
const paypal = new PayPalPayment();

const subscriptionWithCreditCard = new SubscriptionPurchase(creditCard);
subscriptionWithCreditCard.makePurchase(30);

const oneTimePurchaseWithPaypal = new OneTimePurchase(paypal);
oneTimePurchaseWithPaypal.makePurchase(50);
