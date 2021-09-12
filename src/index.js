/* eslint-disable no-console */
import axios from 'axios';
import fs from 'fs';
import isEmpty from 'lodash.isempty';

const missing = '⚠️...';

async function run(env) {
  const translator = axios.create({
    baseURL: env.TRANSLATE_API_BASE_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
  });

  async function translate(text, isKey) {
    let query = text.split('.');
    query = query[query.length - 1].replace(/_/g, ' ');

    const response = await translator.post('/translate', {
      q: isKey ? query : text,
      source: env.SOURCE_LNG,
      target: env.TARGET_LNG,
    });

    return `${response.data.translatedText}${env.FLAG_NEW ? ' 🆕' : ''}`;
  }

  async function findMissing(state, key) {
    let value = state[key];
    if (isEmpty(value)) {
      value = missing;

      if (env.DEBUG) {
        console.log(`Missing value for key "${key}"`);
      }

      if (env.AUTOTRANSLATE) {
        value = await translate(key, true);
      }

      if (env.DEBUG) {
        console.log(`Set "${key}" into "${value}"`);
      }
    } else if (env.AUTOTRANSLATE) {
      value = await translate(value, false);
    }

    return value.toLowerCase();
  }

  let result = {};

  try {
    const prevState = JSON.parse(fs.readFileSync(env.FILE_PREVSTATE, 'utf8'));
    const keysToAdd = JSON.parse(fs.readFileSync(env.FILE_ADDKEYS, 'utf8'));

    if (env.DEBUG) {
      console.log(`${env.FILE_PREVSTATE} and ${env.FILE_ADDKEYS} parsed with success!\n`);
      console.log(`prevState:\n${JSON.stringify(prevState, null, 2)}\n`);
    }

    let nextState = Object.fromEntries(await Promise.all(Object.keys(prevState)
      .map(async (key) => {
        const value = await findMissing(prevState, key);
        return [key, value];
      })));

    if (!isEmpty(keysToAdd)) {
      nextState = {
        ...nextState,
        ...Object.fromEntries(await Promise.all(keysToAdd
          .map(async (key) => {
            const value = await findMissing(prevState, key);
            return [key, value];
          }))),
      };
    } else if (env.DEBUG) {
      console.log(`No keys to add.\n`);
    }

    result = JSON.stringify(nextState, null, 2);

    if (env.DEBUG) {
      console.log(`Writing result JSON into "${env.FILE_NEXTSTATE}"...`);
      console.log(`result:\n${result}\n`);
    }

    fs.writeFile(env.FILE_NEXTSTATE, result, () => {
      if (env.DEBUG) {
        console.log(`File wrote with success!`);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return result;
}

export default run;
