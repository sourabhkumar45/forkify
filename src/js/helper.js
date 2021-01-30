// This is a hepler file  which contains all the hepler function used across the project.

import { async } from 'regenerator-runtime';
import {TIMEOUT_SECOND} from './config.js'

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const t = fetch(url);
    const res = await Promise.race([t, timeout(TIMEOUT_SECOND)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
