export class Vector {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public next(velocity: Vector): Vector {
    return new Vector(this.x + velocity.x, this.y + velocity.y);
  }
}

export interface Movable {
  getPosition(): Vector;
  getVelosity(): Vector;
  setPosition(newV: Vector): void;
}

export class Move {
  public m: Movable;
  constructor(m: Movable) {
    this.m = m;
  }
  public execute(): void {
    try {
      this.m.setPosition(this.m.getPosition().next(this.m.getVelosity()));
    } catch (error) {
      throw new Error('can not move');
    }
  }
}

export interface IUObject {
  getProperty(key: string): Vector | number;
  setProperty(key: string, newValue: Vector | number): void;
}

export class MovableAdapter implements Movable {
  public o: IUObject;
  constructor(o: IUObject) {
    this.o = o;
  }

  getPosition(): Vector {
    return this.o.getProperty('position') as Vector;
  }
  getVelosity(): Vector {
    return this.o.getProperty('velocity') as Vector;
  }
  setPosition(newV: Vector): void {
    this.o.setProperty('position', newV);
  }
}
