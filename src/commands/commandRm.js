import showCurrentDirectory from "../utils.js";
import fs from "fs";
import path from "path";

export default async function goRm(pathToFile) {
  fs.unlink(path.resolve(pathToFile), (err) => {
    if (err) console.error('Operation failed');
  });
  showCurrentDirectory();
}

