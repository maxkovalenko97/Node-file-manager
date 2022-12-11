import { showCurrentDirectory } from "../utils.js";
import fs from 'fs';
import path, { resolve } from "path";

export default async function goCp(pathToFile, pathToNewDir) {
  try {
    pathToFile = resolve(pathToFile);
    pathToNewDir = resolve(pathToNewDir, path.basename(pathToFile));

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

