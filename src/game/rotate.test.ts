import { IUObject } from './IUObgect.interface';
import { Direction, Rotate, RotateAdapter } from './rotate';

let ship: IUObject;

describe('rotatable', () => {
  const getDirectionMock = jest
    .spyOn(RotateAdapter.prototype, 'getDirection')
    .mockImplementationOnce(() => new Direction(3, 2, 8));

  const getVelocityMock = jest
    .spyOn(RotateAdapter.prototype, 'getAngularVelosity')
    .mockImplementationOnce(() => 2);

  const getdirectionsNumberMock = jest
    .spyOn(RotateAdapter.prototype, 'getDirectionNumber')
    .mockImplementationOnce(() => 8);

  const setPositionMock = jest
    .spyOn(RotateAdapter.prototype, 'setDirection')
    .mockImplementation(() => undefined);

  it('3 + 2 = 5', () => {
    const m = new Rotate(new RotateAdapter(ship));
    m.execute();
    expect(getDirectionMock).toHaveBeenCalled();
    expect(getVelocityMock).toHaveBeenCalled();
    expect(setPositionMock).toHaveBeenCalledWith(new Direction(5, 2, 8));
  });

  it('not velocity', () => {
    const m = new Rotate(new RotateAdapter(ship));
    expect(getDirectionMock).toHaveBeenCalled();
    expect(getVelocityMock).toHaveBeenCalled();
    expect(() => m.execute()).toThrow(new Error('can not rotate'));
  });

  it('not position', () => {
    const m = new Rotate(new RotateAdapter(ship));
    expect(getDirectionMock).toHaveBeenCalled();
    expect(getVelocityMock).toHaveBeenCalled();
    expect(() => m.execute()).toThrow(new Error('can not rotate'));
  });
});
