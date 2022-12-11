import { showCurrentDirectory } from "../utils.js";
import fs from 'fs';
import { resolve } from "path";

export default async function goRn(fileName, newFileName) {
  fs.rename(fileName, newFileName, (err) => {
    if (err) console.log('Operation failed');
  });
  showCurrentDirectory();
}

