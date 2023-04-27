import { IUObject } from './IUObgect.interface';
import { BurnFuelCommand, CheckFuelCommand, FuelableAdapter } from './fuel';

let ship: IUObject;

describe('fuelable', () => {
  it('check fuel', () => {
    const getFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelLevel')
      .mockImplementationOnce(() => 7)
      .mockImplementationOnce(() => 2);
    const getFuelConsumptionMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelConsumption')
      .mockImplementationOnce(() => 3)
      .mockImplementationOnce(() => 3);
    const setFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'setFuelLevel')
      .mockImplementation(() => undefined);
    const m = new CheckFuelCommand(new FuelableAdapter(ship));

    expect(() => m.execute()).not.toThrow();

    expect(getFuelLevelMock).toHaveBeenCalled();
    expect(getFuelConsumptionMock).toHaveBeenCalled();
    expect(setFuelLevelMock).not.toHaveBeenCalled();

    expect(() => m.execute()).toThrow(new Error('problem with fuel'));
  });

  it('burn fuel', () => {
    const getFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelLevel')
      .mockImplementationOnce(() => 7);
    const getFuelConsumptionMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelConsumption')
      .mockImplementationOnce(() => 3);
    const setFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'setFuelLevel')
      .mockImplementation(() => undefined);

    const m = new BurnFuelCommand(new FuelableAdapter(ship));
    m.execute();
    expect(getFuelLevelMock).toHaveBeenCalled();
    expect(getFuelConsumptionMock).toHaveBeenCalled();
    expect(setFuelLevelMock).toHaveBeenCalledWith(4);
  });

  it('not level fuel', () => {
    const m = new CheckFuelCommand(new FuelableAdapter(ship));
    expect(() => m.execute()).toThrow(new Error('problem with fuel'));
  });
});
