import showCurrentDirectory from "../utils.js";
import fs, { readFile } from "fs";
import path from "path";
import crypto from "crypto";

export default async function getHash(pathToFile) {
  try {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(path.resolve(pathToFile));
    hash.setEncoding('hex');

    input.on('end', () => {
      hash.end();
      console.log(hash.read());
      showCurrentDirectory();
    });

    input.on('error', (err) => {
      console.error('Operation failed');
      showCurrentDirectory();
    });
    input.pipe(hash);
  } catch (error) {
    console.error('Operation failed');
    showCurrentDirectory();
  }
};
