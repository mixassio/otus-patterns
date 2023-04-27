import { ICommand } from './ICommand.interface';
import { IUObject } from './IUObgect.interface';

export class Direction {
  public d: number;
  public v: number;
  public n: number;
  constructor(d: number, v: number, n: number) {
    this.d = d;
    this.v = v;
    this.n = n;
  }
  public next(angularVelosity: number): Direction {
    return new Direction((this.d + angularVelosity) % this.n, angularVelosity, this.n);
  }
}

interface Rotable {
  getDirection(): Direction;
  getAngularVelosity(): number;
  // getDirectionNumber(): number;
  setDirection(newD: Direction): void;
}

export class Rotate implements ICommand {
  public r: Rotable;
  constructor(r: Rotable) {
    this.r = r;
  }
  public execute(): void {
    try {
      this.r.setDirection(this.r.getDirection().next(this.r.getAngularVelosity()));
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
  getDirection(): Direction {
    return new Direction(
      this.o.getProperty('direction') as number,
      this.o.getProperty('velocity') as number,
      this.o.getProperty('directionsNumber') as number,
    );
    // return this.o.getProperty('direction') as number;
  }

  getAngularVelosity(): number {
    return this.o.getProperty('velocity') as number;
  }

  getDirectionNumber(): number {
    return this.o.getProperty('directionsNumber') as number;
  }

  setDirection(newV: Direction): void {
    this.o.setProperty('direction', newV);
  }
}
