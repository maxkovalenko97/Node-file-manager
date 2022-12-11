import showCurrentDirectory, { isFile } from "../utils.js";
import path from 'path';
import zlib from 'zlib';
import fs from 'fs';
import { pipeline } from 'stream/promises';


export default async function compressFile(pathToFile, pathToDestination) {
  try {
    pathToFile = path.resolve(pathToFile);
    pathToDestination = path.resolve(pathToDestination);

    if ((await isFile(pathToFile) === 'file') && (await isFile(pathToDestination) === 'dir')) {
      const readableStream = fs.createReadStream(pathToFile);
      const writableStream = fs.createWriteStream(path.resolve(pathToDestination, `${path.basename(pathToFile)}.br`));
      const brotliCompress = zlib.createBrotliCompress();
      await pipeline(readableStream, brotliCompress, writableStream);
      showCurrentDirectory();
    }
  } catch (err) {
    console.error('Operation failed', err);
    showCurrentDirectory();
  }
}
