const b0c0 = (_a: number, _b: number, _c: number): Number[] => [0, 0];

const b0c = (a: number, _b: number, c: number): Number[] => {
  const x = -c / a;
  if (x < 0) {
    return [];
  } else {
    const result = Math.sqrt(x);
    return [-result, result];
  }
};

const bc0 = (a: number, b: number, _c: number): Number[] => {
  const result = -b / a;
  return [0, result];
};

const partialRatio1 = (a: number, _b: number, c: number): Number[] => [-1, -c / a];

const partialRatio2 = (a: number, _b: number, c: number): Number[] => [1, c / a];

const discriminant = (a: number, b: number, c: number): number => b * b - 4 * a * c;

const defaultFunc = (a: number, b: number, c: number): Number[] => {
  const d = discriminant(a, b, c);
  if (d < 0) {
    return [];
  } else if (doubleIsZero(d)) {
    return [-b / (2 * a)];
  } else {
    const sqrtD = Math.sqrt(d);
    const x1 = (-b - sqrtD) / (2 * a);
    const x2 = (-b + sqrtD) / (2 * a);
    return [x1, x2];
  }
};

const doubleIsZero = (x: number): boolean => Math.abs(0 - x) < Number.EPSILON;

export const solve = (a: number, b: number, c: number): Number[] => {
  if (doubleIsZero(a)) {
    throw new Error('a can not equal 0');
  } else if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
    throw new Error('coef must be digital');
  } else if (doubleIsZero(b) && doubleIsZero(c)) {
    return b0c0(a, b, c);
  } else if (doubleIsZero(b)) {
    return b0c(a, b, c);
  } else if (doubleIsZero(c)) {
    return bc0(a, b, c);
  } else if (Math.abs(a + c - b) < Number.EPSILON) {
    return partialRatio1(a, b, c);
  } else if (Math.abs(a + b + c) < Number.EPSILON) {
    return partialRatio2(a, b, c);
  } else {
    return defaultFunc(a, b, c);
  }
};
