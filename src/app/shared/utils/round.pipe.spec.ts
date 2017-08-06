import { RoundPipe } from './round.pipe';

describe('RoundPipe', () => {
  let pipe: RoundPipe;

  beforeEach(() => {
    pipe = new RoundPipe();
  });

  // Testing that the pipe actually works as intended
  it('transforms "20.7" to "21"', () => {
    expect(pipe.transform(20.7)).toBe(21);
  });
});
