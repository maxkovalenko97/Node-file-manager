import fs, { stat } from 'fs';
import { open } from 'fs/promises';
import path, { resolve } from 'path';

export default function showCurrentDirectory(arg) {
  let dir = arg ? arg : process.cwd();
  process.stdout.write(`You are currently in ${dir}\n`);
}

async function isFile(pathToFile) {
  let filehandle, stats;
  try {
    pathToFile = path.resolve(pathToFile);
    filehandle = await open(pathToFile, 'r');
    stats = await filehandle.stat();
    if (stats.isFile()) {
      return 'file';
    } else {
      return 'dir';
    }
  } catch (err) {
    console.log('Operation failed');
  }
}

export { isFile };