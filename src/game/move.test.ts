import { IUObject } from './IUObgect.interface';
import { MovableAdapter, Move, Vector } from './move';

let ship: IUObject;

describe('movable', () => {
  const getPositionMock = jest
    .spyOn(MovableAdapter.prototype, 'getPosition')
    .mockImplementationOnce(() => new Vector(12, 5));

  const getVelocityMock = jest
    .spyOn(MovableAdapter.prototype, 'getVelosity')
    .mockImplementationOnce(() => new Vector(-7, 3));

  const setPositionMock = jest
    .spyOn(MovableAdapter.prototype, 'setPosition')
    .mockImplementation(() => undefined);

  it('(12,5) + (-7,3) = (5,8)', () => {
    const m = new Move(new MovableAdapter(ship));
    m.execute();
    expect(getPositionMock).toHaveBeenCalled();
    expect(getVelocityMock).toHaveBeenCalled();
    expect(setPositionMock).toHaveBeenCalledWith(new Vector(5, 8));
  });

  it('not velocity', () => {
    const m = new Move(new MovableAdapter(ship));
    expect(getPositionMock).toHaveBeenCalled();
    expect(getVelocityMock).toHaveBeenCalled();
    expect(() => m.execute()).toThrow(new Error('can not move'));
  });

  it('not position', () => {
    const m = new Move(new MovableAdapter(ship));
    expect(getPositionMock).toHaveBeenCalled();
    expect(getVelocityMock).toHaveBeenCalled();
    expect(() => m.execute()).toThrow(new Error('can not move'));
  });
});
