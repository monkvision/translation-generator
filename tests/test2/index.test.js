import assert from 'assert';
import dotenv from 'dotenv';

import { run } from '../consts.test.js';

const env = dotenv.config({ path: 'tests/test2/.env' }).parsed;

describe('translation-generator', () => {
  it('runs test2', async () => {
    assert.equal(await run(env), JSON.stringify({
      monk_is_cool: 'le moine est cool',
      natsuki_likes_wine: 'natsuki aime le vin',
      front_end_team_is_the_best: 'l\'équipe de front est la meilleure',
      i_am_missing: 'j\'ai disparu.',
      i_am_not_missing_anymore: 'je n\'ai plus disparu.',
    }, null, 2));
  });
});
