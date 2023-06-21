export abstract class Result<T> {
  abstract unwrap (): T;
  abstract get ok (): T | null;
  abstract get err (): Error | null;
  abstract map<Other> (fn: (value: T) => Other): Result<Other>;

  isOk(): this is ResultOk<T> {
    return this.err === null;
  }

  isErr(): this is ResultErr<T> {
    return this.err !== null;
  }

  or<Other> (value: Result<Other>): Result<T | Other> {
    return this.isOk() ? this : value;
  }

  and<Other> (value: Result<Other>): Result<T | Other> {
    return this.isErr() ? this : value;
  }

  promise(): Promise<T> {
    return this.isOk() ? Promise.resolve(this.ok) : Promise.reject(this.err);
  }

  static async Unwrap<T> (value: T | Promise<T>): Promise<Result<T>> {
    try {
      return Result.Ok(await value);
    } catch (err) {
      return Result.Err(err instanceof Error ? err : new Error('Unexpected Error'));
    }
  }
  static Ok<T> (value: T): Result<T> {
    return new ResultOk(value);
  }
  static Err<T> (err: string | Error): Result<T> {
    return new ResultErr(typeof err === 'string' ? new Error(err) : err);
  }
}

class ResultOk<T> extends Result<T> {
  constructor(readonly ok: T) {
    super();
  }

  get err () {
    return null;
  }

  map<Other> (fn: (value: T) => Other): Result<Other> {
    return Result.Ok(fn(this.ok));
  }

  unwrap(): T {
    return this.ok;    
  }
}

class ResultErr<T> extends Result<T> {
  constructor(readonly err: Error) {
    super();
  }

  unwrap(): never {
    throw new Error('TODO');
  }

  map<Other>(_fn: (value: T) => Other): Result<Other> {
    return Result.Err(this.err);
  }

  get ok(): null {
    return null;
  }
}
