class UserProfile {
  public username: string;

  public age?: number;
  public email?: string;
  public address?: string;
  public phoneNumber?: string;

  constructor(builder: UserProfileBuilder) {
    this.username = builder.username;
    this.age = builder.age;
    this.email = builder.email;
    this.address = builder.address;
    this.phoneNumber = builder.phoneNumber;
  }

  public toString(): string {
    return `UserProfile [username=${this.username}, age=${this.age}, email=${this.email}, address=${this.address}, phoneNumber=${this.phoneNumber}]`;
  }
}

class UserProfileBuilder {
  public username: string;

  public age?: number;
  public email?: string;
  public address?: string;
  public phoneNumber?: string;

  constructor(username: string) {
    this.username = username;
  }

  public setAge(age: number): UserProfileBuilder {
    this.age = age;
    return this;
  }

  public setEmail(email: string): UserProfileBuilder {
    this.email = email;
    return this;
  }

  public setAddress(address: string): UserProfileBuilder {
    this.address = address;
    return this;
  }

  public setPhoneNumber(phoneNumber: string): UserProfileBuilder {
    this.phoneNumber = phoneNumber;
    return this;
  }

  public build(): UserProfile {
    return new UserProfile(this);
  }
}

const user1 = new UserProfileBuilder("john_doe")
  .setAge(25)
  .setEmail("john@example.com")
  .build();

console.log(user1.toString());

const user2 = new UserProfileBuilder("jane_doe")
  .setAge(30)
  .setAddress("123 Main St")
  .setPhoneNumber("555-1234")
  .build();

console.log(user2.toString());
