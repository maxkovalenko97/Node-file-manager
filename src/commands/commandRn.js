import showCurrentDirectory from "../utils.js";
import fs from 'fs';
import path from "path";

export default async function goRn(file, newFileName) {
  let fileName = path.resolve(file);
  fs.rename(fileName, newFileName, (err) => {
    if (err) {
      console.error('Operation failed')
      showCurrentDirectory();
    } else
      showCurrentDirectory();
  });
}

