import { createReadStream, createWriteStream } from 'node:fs';
import { access, writeFile, rename, rm as remove } from 'node:fs/promises';
import { getAbsolutePath, isFilename } from './utils.js';
import { parse, join } from 'node:path';

export async function cat(pathToFile) {
  if (!pathToFile) throw new Error('Invalid input');
  pathToFile = getAbsolutePath(pathToFile);
  await access(pathToFile).catch(() => {
    throw new Error('Operation failed');
  });
  await new Promise((res) => {
    const input = createReadStream(pathToFile);
    input.pipe(process.stdout);
    input.on('end', () => res());
  });
}

export async function add(newFilename) {
  if (!newFilename) throw new Error('Invalid input');
  if (!isFilename(newFilename)) throw new Error('Operation failed');
  const pathToFile = getAbsolutePath(newFilename);
  await access(pathToFile).then(
    () => {
      throw new Error('Operation failed');
    },
    async () => {
      await writeFile(pathToFile, '');
    }
  );
}

export async function rn(pathToFile, newFilename) {
  if (!pathToFile || !newFilename) throw new Error('Invalid input');
  pathToFile = getAbsolutePath(pathToFile);
  await access(pathToFile).catch(() => {
    throw new Error('Operation failed');
  });
  if (!isFilename(newFilename)) throw new Error('Operation failed');
  const dir = parse(pathToFile).dir;
  const newPathToFile = join(dir, newFilename);
  await access(newPathToFile).then(
    () => {
      throw new Error('Operation failed');
    },
    async () => await rename(pathToFile, newPathToFile)
  );
}

export async function cp(pathToFile, pathToNewDir) {
  await copyRemove(pathToFile, pathToNewDir);
}

export async function mv(pathToFile, pathToNewDir) {
  await copyRemove(pathToFile, pathToNewDir, true);
}

async function copyRemove(pathToFile, pathToNewDir, del = false) {
  if (!pathToFile || !pathToNewDir) throw new Error('Invalid input');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    pathToNewDir = getAbsolutePath(pathToNewDir);
    const pathToNewFile = join(pathToNewDir, parse(pathToFile).base);
    console.log(pathToNewFile);
    await access(pathToNewFile).then(
      () => {
        throw new Error('');
      },

      () => {
        const input = createReadStream(pathToFile);
        const output = createWriteStream(pathToNewFile);
        input.pipe(output);
        input.on('end', async () => {
          if (del) await remove(pathToFile);
        });
      }
    );
  } catch {
    throw new Error('Operation failed');
  }
}

export async function rm(pathToFile) {
  try {
    pathToFile = getAbsolutePath(pathToFile);
    console.log(pathToFile);
    await access(pathToFile).then(async () => {
      await remove(pathToFile);
    });
  } catch {
    throw new Error('Operation failed');
  }
}
