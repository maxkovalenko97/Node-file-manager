// import { showCurrentDirectory, isFileOrDir } from "../utils.js";
import showCurrentDirectory from "../utils.js";
import fs from 'fs';
import path, { resolve } from "path";

export default async function goCp(pathToFile, pathToNewDir) {
  try {
    pathToFile = resolve(pathToFile);
    pathToNewDir = resolve(pathToNewDir, path.basename(pathToFile));

    // console.log(await isFileOrDir(pathToFile), '1');
    // console.log(await isFileOrDir(pathToNewDir), '2');

    const readableStream = fs.createReadStream(pathToFile);
    const writableStream = fs.createWriteStream(pathToNewDir);
    await readableStream.pipe(writableStream);
    showCurrentDirectory();
  }
  catch (error) {
    console.error('Operation failed');
  }
}

// PROBLEMS WITH COPY DIRECTRY, CATCHING ERRORS

