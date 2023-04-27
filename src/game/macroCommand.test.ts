import { IUObject } from './IUObgect.interface';
import { BurnFuelCommand, CheckFuelCommand, FuelableAdapter } from './fuel';
import { MacroCommand } from './macroCommand';

describe('macrocommand', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('two command - successfull', () => {
    const ship: IUObject = {} as IUObject;
    const getFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelLevel')
      .mockImplementationOnce(() => 7) // for CheckFuelCommand
      .mockImplementationOnce(() => 7); // for BurnFuelCommand
    const getFuelConsumptionMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelConsumption')
      .mockImplementationOnce(() => 3) // for CheckFuelCommand
      .mockImplementationOnce(() => 3); // for BurnFuelCommand
    const setFuelLevelMock1 = jest
      .spyOn(FuelableAdapter.prototype, 'setFuelLevel')
      .mockImplementation(() => undefined);

    const m = new MacroCommand([
      new CheckFuelCommand(new FuelableAdapter(ship)),
      new BurnFuelCommand(new FuelableAdapter(ship)),
    ]);

    expect(() => m.execute()).not.toThrow();

    expect(getFuelLevelMock).toHaveBeenCalledTimes(2);
    expect(getFuelConsumptionMock).toHaveBeenCalledTimes(2);
    expect(setFuelLevelMock1).toHaveBeenCalledWith(4);
  });
  it('two command - failure', () => {
    const ship: IUObject = {} as IUObject;
    const getFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelLevel')
      .mockImplementationOnce(() => 2); // for CheckFuelCommand
    const getFuelConsumptionMock = jest
      .spyOn(FuelableAdapter.prototype, 'getFuelConsumption')
      .mockImplementationOnce(() => 3); // for CheckFuelCommand
    const setFuelLevelMock = jest
      .spyOn(FuelableAdapter.prototype, 'setFuelLevel')
      .mockImplementation(() => undefined);

    const m = new MacroCommand([
      new CheckFuelCommand(new FuelableAdapter(ship)),
      new BurnFuelCommand(new FuelableAdapter(ship)),
    ]);

    expect(() => m.execute()).toThrow();

    expect(getFuelLevelMock).toHaveBeenCalledTimes(1);
    expect(getFuelConsumptionMock).toHaveBeenCalledTimes(1);
    expect(setFuelLevelMock).not.toHaveBeenCalled();
  });
});
