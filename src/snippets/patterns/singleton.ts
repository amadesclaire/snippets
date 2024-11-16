class Logger {
  // Hold the single instance of Logger
  private static instance: Logger;

  // Private constructor prevents direct instantiation
  private constructor() {}

  // Static method to provide global access to the instance
  public static getInstance(): Logger {
    // Check if an instance already exists
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Example method for logging messages
  public log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

const logger1 = Logger.getInstance();
logger1.log("This is a log message."); // Output: [LOG]: This is a log message.

const logger2 = Logger.getInstance();
logger2.log("This is another log message."); // Output: [LOG]: This is another log message.

// Verify that both instances are the same
console.log(logger1 === logger2); // Output: true
