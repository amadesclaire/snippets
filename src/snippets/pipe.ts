type Result<T> = T | Error;

class User {
  name: string;
  passwordHash?: string;
  emailVerified?: boolean;
  isAdmin?: boolean;

  constructor(
    name: string,
    passwordHash?: string,
    emailVerified?: boolean,
    isAdmin?: boolean
  ) {
    this.name = name;
    this.passwordHash = passwordHash;
    this.emailVerified = emailVerified;
    this.isAdmin = isAdmin;
  }
}

function pipe<T>(value: T, ...fns: Array<(arg: T) => Result<T>>): Result<T> {
  try {
    return fns.reduce<Result<T>>((acc, fn) => {
      if (acc instanceof Error) {
        // If an error is already encountered, propagate it
        return acc;
      }

      const result = fn(acc);

      if (result instanceof Error) {
        // If a function returns an error, propagate it
        return result;
      }

      return result;
    }, value);
  } catch (err) {
    // Catch any unexpected errors
    return new Error(`An unexpected error occurred: ${err}`);
  }
}

// Define functions that return Result<T> (either T or Error)
const makeAdmin = (user: User): Result<User> => {
  if (!user) {
    return new Error("Invalid user");
  }
  user.isAdmin = true;
  return user;
};

const setPasswordHash =
  (hash: string) =>
  (user: User): Result<User> => {
    if (!hash) {
      return new Error("Invalid password hash");
    }
    user.passwordHash = hash;
    return user;
  };

const setEmailVerified = (user: User): Result<User> => {
  if (!user) {
    return new Error("Invalid user");
  }
  user.emailVerified = true;
  return user;
};

// Usage
const user = new User("Alice");

const result = pipe(
  user,
  makeAdmin,
  setPasswordHash("hashed_password"),
  setEmailVerified
);

if (result instanceof Error) {
  console.error(result.message); // Handle error
} else {
  console.log(result); // Handle successful case
}
