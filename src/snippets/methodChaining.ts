class User {
  constructor(
      public name: string,
      public isAdmin: boolean = false,
      public passwordHash: string = '',
      public emailVerified: boolean = false
  ) {}
}

class UserBuilder {
  private user: User;
  private error: Error | null = null;

  constructor(user: User) {
      this.user = user;
  }

  makeAdmin(): this {
      if (this.error) return this; // Skip if error already exists
      if (!this.user.name) {
          this.error = new Error('Invalid user: Name is missing');
      } else {
          this.user.isAdmin = true;
      }
      return this;
  }

  setPasswordHash(hash: string): this {
      if (this.error) return this; // Skip if error already exists
      if (!hash) {
          this.error = new Error('Invalid password hash');
      } else {
          this.user.passwordHash = hash;
      }
      return this;
  }

  setEmailVerified(): this {
      if (this.error) return this; // Skip if error already exists
      this.user.emailVerified = true;
      return this;
  }

  build(): User | Error {
      if (this.error) {
          return this.error;
      }
      return this.user;
  }
}

// Usage example
const user = new User('Alice');

const result = new UserBuilder(user)
  .makeAdmin()
  .setPasswordHash('hashed_password')
  .setEmailVerified()
  .build();

if (result instanceof Error) {
  console.error(result.message); // Handle the error
} else {
  console.log(result); // Handle the success
}