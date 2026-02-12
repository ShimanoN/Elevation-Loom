/**
 * Result type for error handling
 * Represents either a successful value or an error
 */

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Create a successful Result
 */
export function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/**
 * Create an error Result
 */
export function Err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * Helper to check if a Result is Ok
 */
export function isOk<T, E>(
  result: Result<T, E>
): result is { ok: true; value: T } {
  return result.ok === true;
}

/**
 * Helper to check if a Result is Err
 */
export function isErr<T, E>(
  result: Result<T, E>
): result is { ok: false; error: E } {
  return result.ok === false;
}

/**
 * Map a Result's value if Ok
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  if (result.ok) {
    return Ok(fn(result.value));
  }
  return result;
}

/**
 * Chain Result operations (flatMap/bind)
 */
export function chainResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  if (result.ok) {
    return fn(result.value);
  }
  return result;
}

/**
 * Unwrap a Result, throwing if it's an error
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  }
  throw result.error;
}

/**
 * Unwrap a Result, returning a default value if it's an error
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (result.ok) {
    return result.value;
  }
  return defaultValue;
}
