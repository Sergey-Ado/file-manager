import { homedir } from 'node:os';
import { isAbsolute, join, parse } from 'node:path';

export function getUsername() {
  try {
    const username =
      process.env.npm_config_username ||
      process.argv[2].match(/^--username=(.+)$/)[1] ||
      '';
    if (username.trim() == '') throw new Error();
    return username;
  } catch {
    throw new Error('The --username key was not entered. Process interrupted');
  }
}

export function parseInput(str) {
  const res = new Array(3).fill(undefined);
  str = str.trim();

  for (let i = 0; i < 3; i++) {
    let member = getMember(str);
    if (!member.result) return res;
    res[i] = member.result;
    str = str.slice(member.newIndex).trim();
  }

  return res;
}

function getMember(str) {
  if (str.length == 0) return { result: undefined, newIndex: -1 };
  if ('\'"'.indexOf(str[0]) >= 0) {
    let i = str.indexOf(str[0], 1);
    if (i == -1) return { result: undefined, newIndex: -1 };
    return { result: str.slice(1, i), newIndex: i + 1 };
  } else {
    let i = str.indexOf(' ');
    if (i == -1) return { result: str, newIndex: str.length };
    return { result: str.slice(0, i), newIndex: i };
  }
}

let currentDir = homedir();

export function showCurrentDir() {
  console.log('');
  console.log(`You are currently in ${currentDir}`);
}

export function getCurrentDir() {
  return currentDir;
}

export function setCurrentDir(newCurrentDir) {
  currentDir = newCurrentDir;
}

export function getAbsolutePath(path) {
  if (/^[a-zA-Z]:$/.test(path)) path += '/';
  if (isAbsolute(path)) return path;
  else return join(currentDir, path);
}

export function isFilename(filename) {
  return parse(filename).dir == '';
}
