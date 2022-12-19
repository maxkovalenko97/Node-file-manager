import { isFile } from "../utils.js";
import showCurrentDirectory from "../utils.js";
import fs from 'fs';
import path, { resolve } from "path";
import { pipeline } from 'stream';

export default async function goCp(pathToFile, pathToNewDir) {
  let pathToNewFile = '';
  try {
    pathToFile = resolve(pathToFile);
    pathToNewFile = resolve(resolve(pathToNewDir), path.basename(pathToFile));

    fs.open(pathToNewFile, "wx", function (err, fd) {
      if (err) {
        console.log('Operation failed. File already exist');
      }
    });

    if ((await isFile(pathToFile) === 'file') && (await isFile(resolve(pathToNewDir)) === 'dir')) {
      pipeline(
        fs.createReadStream(pathToFile),
        fs.createWriteStream(pathToNewFile),
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
  }
  catch (error) {
    console.error('Operation failed');
    showCurrentDirectory();
  }
}



