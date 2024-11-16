interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) {
    console.log(`Sending Email with message: ${message}`);
  }
}

class SMSNotification implements Notification {
  send(message: string) {
    console.log(`Sending SMS with message: ${message}`);
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log(`Sending Push Notification with message: ${message}`);
  }
}

abstract class NotificationFactory {
  abstract createNotification(): Notification;
}

class EmailNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new SMSNotification();
  }
}

class PushNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new PushNotification();
  }
}

const emailFactory = new EmailNotificationFactory();
const emailNotification = emailFactory.createNotification();
emailNotification.send("Welcome to our service!"); // Output: Sending Email with message: Welcome to our service!

const smsFactory = new SMSNotificationFactory();
const smsNotification = smsFactory.createNotification();
smsNotification.send("Your OTP is 123456"); // Output: Sending SMS with message: Your OTP is 123456
