import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { getAbsolutePath } from './utils.js';

export async function compress(pathToFile, pathToDestination) {
  await zipFunction(pathToFile, pathToDestination);
}

export async function decompress(pathToFile, pathToDestination) {
  await zipFunction(pathToFile, pathToDestination, 'decompress');
}

async function zipFunction(pathToFile, pathToDestination, method = 'compress') {
  if (!pathToFile || !pathToDestination) throw new Error('Invalid input');
  try {
    pathToFile = getAbsolutePath(pathToFile);
    pathToDestination = getAbsolutePath(pathToDestination);
    await access(pathToDestination).then(
      () => {
        throw new Error();
      },
      async () => {
        await new Promise((res, rej) => {
          const input = createReadStream(pathToFile);
          const output = createWriteStream(pathToDestination);
          const bzip =
            method == 'compress'
              ? createBrotliCompress()
              : createBrotliDecompress();
          input.pipe(bzip).pipe(output);
          input.on('end', () => res());
          input.on('error', () => rej());
          output.on('error', () => rej());
        });
      }
    );
  } catch (e) {
    throw new Error('Operation failed');
  }
}
