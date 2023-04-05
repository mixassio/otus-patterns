import { Vector } from './move';

interface Rotable {
  getDirection(): number;
  getAngularVelosity(): number;
  setDirection(newD: number): void;
}

export class Rotate {
  public r: Rotable;
  constructor(r: Rotable) {
    this.r = r;
  }
  public execute(): void {
    try {
      this.r.setDirection(this.r.getDirection() + this.r.getAngularVelosity());
    } catch (error) {
      throw new Error('can not rotate');
    }
  }
}

export class RotateAdapter implements Rotable {
  public o: IUObject;
  constructor(o: IUObject) {
    this.o = o;
  }

  getAngularVelosity(): number {
    const d: number = this.o.getProperty('direction');
    const n: number = this.o.getProperty('directionsNumber');
    const v: number = this.o.getProperty('velocity');
    return v * Math.cos((d / 360) * n), v * Math.sin((d / 360) * n);
  }

  getDirection(): number {
    return this.o.getProperty('direction');
  }

  setDirection(newV: number): void {
    this.o.setProperty('direction', newV);
  }
}

export interface IUObject {
  position?: Vector | undefined;
  velocity?: Vector | undefined;
  direction?: number;
  directionNumber?: number;
  getProperty(key: IOProperty): any;
  setProperty(key: string, newValue: object | number): void;
}

export type IOProperty = 'direction' | 'directionsNumber' | 'velocity' | 'position';
