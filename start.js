import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import run from './src/index.js';

const localEnv = dotenv.config({ path: '.env.local' }).parsed;

run(localEnv);
