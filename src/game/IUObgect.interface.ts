import { Vector } from './move';
import { Direction } from './rotate';

export interface IUObject {
  getProperty(key: string): Vector | number;
  setProperty(key: string, newValue: Vector | Direction): void;
}
