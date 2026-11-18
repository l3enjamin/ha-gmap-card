declare module "bun:test" {
  export function describe(name: string, fn: () => void | Promise<void>): void;
  export function it(name: string, fn: () => void | Promise<void>): void;
  export function test(name: string, fn: () => void | Promise<void>): void;
  export function beforeEach(fn: () => void | Promise<void>): void;
  export function afterEach(fn: () => void | Promise<void>): void;
  export function expect<T>(actual: T): {
    toBe(expected: any): void;
    toEqual(expected: any): void;
    toMatchObject(expected: any): void;
    toContain(expected: any): void;
    toBeCloseTo(expected: number, precision?: number): void;
    toBeGreaterThan(expected: number): void;
    toBeNull(): void;
    not: {
      toBeNull(): void;
      toContain(expected: any): void;
      toBe(expected: any): void;
    };
  };
}
