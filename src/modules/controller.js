import * as nav from './navigation.js';
import * as fs from './file-system.js';
import { os } from './os.js';
import { hash } from './hash.js';
import * as zip from './zip.js';

export async function controller(parse) {
  try {
    if (!functionList.hasOwnProperty(parse[0]))
      throw new Error('Invalid input');
    await functionList[parse[0]](parse[1], parse[2]);
  } catch (e) {
    console.error(e.message);
  }
}

const functionList = { ...nav, ...fs, os, hash, ...zip };
