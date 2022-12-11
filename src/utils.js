import fs, { stat } from 'fs';
import path, { resolve } from 'path';

function showCurrentDirectory(arg) {
  let dir = arg ? arg : process.cwd();
  process.stdout.write(`You are currently in ${dir}\n`);
}

async function isFileOrDir(path) {
  try {
    const stats = await stat(path);
    if (stats.isDirectory()) {
      return 'directory';
    }
  } catch (error) {
    if (stats.ifFile()) {
      return 'file';
    }
    console.error('Non file Non Directory ???');
  }
}

export { showCurrentDirectory, isFileOrDir };

// cd basic-js
// cp text.txt test1