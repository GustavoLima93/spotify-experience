import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('Testa instancia de  DurationPipe', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });
});
