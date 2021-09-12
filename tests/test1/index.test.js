import assert from 'assert';
import dotenv from 'dotenv';
import run from '../../src/index.js';

const env = dotenv.config({ path: 'tests/test1/.env' }).parsed;

describe('translation-generator', () => {
  it('runs ', async () => {
    assert.equal(await run(env), JSON.stringify({
      zero: '⚠️...',
      one: '1',
      two: 'dos',
      three: 'three',
      four: 'four',
      five: 'dive',
      six: '⚠️...',
      seven: '⚠️...',
      eight: '⚠️...',
      nine: '⚠️...',
    }, null, 2));
  });
});
