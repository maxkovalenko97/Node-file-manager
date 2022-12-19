import showCurrentDirectory, { isFile } from "../utils.js";
import path from 'path';
import zlib from 'zlib';
import fs from 'fs';
import { pipeline } from 'stream';


export default async function compressFile(pathToFile, pathToDestination) {
  try {
    pathToFile = path.resolve(pathToFile);
    pathToDestination = path.resolve(pathToDestination);

    if ((await isFile(pathToFile) === 'file') && (await isFile(pathToDestination) === 'dir')) {
      pipeline(
        fs.createReadStream(pathToFile),
        zlib.createBrotliCompress(),
        fs.createWriteStream(path.resolve(pathToDestination, `${path.basename(pathToFile)}.br`)),
        (err) => {
          if (err) {
            console.error('Operation failed');
            showCurrentDirectory();
          }
        });
      showCurrentDirectory();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error('Operation failed');
    showCurrentDirectory();
  }
}
