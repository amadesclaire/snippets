interface PaymentProcessor {
  pay(amount: number): void;
  refund(amount: number): void;
}

class StripePayment {
  public sendPayment(amount: number) {
    console.log(`Processing payment of $${amount} through Stripe`);
  }

  public sendRefund(amount: number) {
    console.log(`Processing refund of $${amount} through Stripe`);
  }
}

class StripeAdapter implements PaymentProcessor {
  private stripe: StripePayment;

  constructor(stripe: StripePayment) {
    this.stripe = stripe;
  }

  public pay(amount: number): void {
    this.stripe.sendPayment(amount);
  }

  public refund(amount: number): void {
    this.stripe.sendRefund(amount);
  }
}

const stripe = new StripePayment();
const paymentProcessor: PaymentProcessor = new StripeAdapter(stripe);

paymentProcessor.pay(100);
paymentProcessor.refund(50);
