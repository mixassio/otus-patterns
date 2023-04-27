import { ICommand } from './ICommand.interface';
import { IUObject } from './IUObgect.interface';

export interface Fuelable {
  getFuelLevel(): number;
  getFuelConsumption(): number;
  setFuelLevel(newF: number): void;
}

export class CheckFuelCommand implements ICommand {
  public f: Fuelable;
  constructor(f: Fuelable) {
    this.f = f;
  }
  public execute(): void {
    try {
      if (this.f.getFuelLevel() - this.f.getFuelConsumption() < 0) {
        throw new Error('CommandException');
      }
    } catch (error) {
      throw new Error('problem with fuel');
    }
  }
}

export class BurnFuelCommand implements ICommand {
  public f: Fuelable;
  constructor(f: Fuelable) {
    this.f = f;
  }
  public execute(): void {
    try {
      const newLFuelLevel = this.f.getFuelLevel() - this.f.getFuelConsumption();
      this.f.setFuelLevel(newLFuelLevel);
    } catch (error) {
      throw new Error('problem with fuel');
    }
  }
}

export class FuelableAdapter implements Fuelable {
  public o: IUObject;
  constructor(o: IUObject) {
    this.o = o;
  }

  getFuelLevel(): number {
    return this.o.getProperty('fuellevel') as number;
  }
  getFuelConsumption(): number {
    return this.o.getProperty('fuelconsumtion') as number;
  }
  setFuelLevel(newF: number): void {
    this.o.setProperty('fuellevel', newF);
  }
}
