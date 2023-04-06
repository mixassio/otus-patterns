import { IUObject, Vector } from './move';

interface Rotable {
  getDirection(): number;
  getAngularVelosity(): number;
  getDirectionNumber(): number;
  setDirection(newD: number): void;
}

export class Rotate {
  public r: Rotable;
  constructor(r: Rotable) {
    this.r = r;
  }
  public execute(): void {
    try {
      this.r.setDirection(
        (this.r.getDirection() + this.r.getAngularVelosity()) % this.r.getDirectionNumber(),
      );
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
  getDirection(): number {
    return this.o.getProperty('direction') as number;
  }

  getAngularVelosity(): number {
    return this.o.getProperty('velocity') as number;
  }

  getDirectionNumber(): number {
    return this.o.getProperty('directionsNumber') as number;
  }

  setDirection(newV: number): void {
    this.o.setProperty('direction', newV);
  }
}
