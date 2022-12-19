import showCurrentDirectory from "../utils.js";
import fs from 'fs';
import { unlink } from "fs/promises";
import path from "path";
import { pipeline } from "stream";

export default async function goMv(pathToFile, pathToNewDir) {
  try {
    pathToFile = path.resolve(pathToFile);
    pathToNewDir = path.resolve(pathToNewDir, path.basename(pathToFile));

    fs.open(pathToNewDir, "wx", function (err, fd) {
      if (err) {
        console.log('Operation failed');
        showCurrentDirectory();
      } else {
        pipeline(
          fs.createReadStream(pathToFile),
          fs.createWriteStream(pathToNewDir),
          (err) => {
            if (err) {
              console.error('Operation failed');
              showCurrentDirectory();
            } else {
              unlink(pathToFile);
              showCurrentDirectory();
            }
          }
        );
      }
    });
  }
  catch (error) {
    console.error('Operation failed');
    showCurrentDirectory();
  }
}

// PROBLEMS WITH MOVE DIRECTRY, CATCHING ERRORS

