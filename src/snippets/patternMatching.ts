// String Matching
class Matcher {
  private value: string;
  private matched: boolean = false;

  constructor(value: string) {
    this.value = value;
  }

  with(matchValue: string, action: () => void): this {
    if (!this.matched && this.value === matchValue) {
      action();
      this.matched = true;
    }
    return this;
  }

  otherwise(action: () => void): void {
    if (!this.matched) {
      action();
    }
  }
}

export function match(value: string) {
  return new Matcher(value);
}

// With match condition
class ConditionMatcher<T> {
  private value: T;
  private matched: boolean = false;

  constructor(value: T) {
    this.value = value;
  }

  with(matchCondition: (value: T) => boolean, action: () => void): this {
    if (!this.matched && matchCondition(this.value)) {
      action();
      this.matched = true;
    }
    return this;
  }

  otherwise(action: () => void): void {
    if (!this.matched) {
      action();
    }
  }
}

export function cMatch<T>(value: T) {
  return new ConditionMatcher(value);
}
