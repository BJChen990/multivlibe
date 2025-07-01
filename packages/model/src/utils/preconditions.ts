// biome-ignore lint/complexity/noStaticOnlyClass: Use static to work with assertion
export class Preconditions {
  static notNull<T>(
    value: T | null | undefined,
    message: string = "Required value not provided",
  ): T {
    if (value == null) {
      throw new Error(message);
    }
    return value;
  }

  static assertState(
    condition: boolean,
    message: string = "Assertion failed",
  ): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }
}
