import { showCurrentDirectory } from "../utils.js";
import fs from 'fs';
import { unlink } from "fs/promises";
import path from "path";
import { pipeline } from "stream";

export default async function goMv(pathToFile, pathToNewDir) {
  try {
    pathToFile = path.resolve(pathToFile);
    pathToNewDir = path.resolve(pathToNewDir, path.basename(pathToFile));
    pipeline(
      fs.createReadStream(pathToFile),
      fs.createWriteStream(pathToNewDir),
      (err) => {
        if (err) {
          console.error('Pipeline failed');
        } else {
          unlink(pathToFile);
          showCurrentDirectory();
        }
      }
    );
  }
  catch (error) {
    console.error('Operation failed');
  }
}

// PROBLEMS WITH MOVE DIRECTRY, CATCHING ERRORS

