export class Preconditions {
  static notNull<T>(value: T | null | undefined, message: string = "Required value not provided"): T {
    if (value == null) {
      throw new Error(message);
    }
    return value;
  }
}
