import { solve } from './quadraticEquation';

it('a can not equal 0', () => {
  expect(() => {
    solve(0, 2, 3);
  }).toThrow();
});

it('x^2+1 = 0', () => {
  const result = solve(1.0, 0, 1);
  expect(result).toEqual([]);
});

it('x^2-1 = 0', () => {
  const result = solve(1.0, 0, -1);
  expect(result).toEqual([-1, 1]);
});

it('x^2+2x+1 = 0', () => {
  const result = solve(1.0, 2, 1);
  expect(result).toEqual([-1, -1]);
});

it('NaN', () => {
  expect(() => {
    solve(1, Number('asdf'), Number('asdf'));
  }).toThrow();
});
