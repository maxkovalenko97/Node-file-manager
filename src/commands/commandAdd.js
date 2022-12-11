import { showCurrentDirectory } from "../utils.js";
import fs from 'fs';
import { resolve } from "path";

export default async function goAdd(fileName) {
  const pathFile = resolve(process.cwd(), fileName);
  fs.open(pathFile, "wx", function (err, fd) {
    if (err) console.log('Operation failed');
  });
  showCurrentDirectory();
}


//to fix showCurrentDirectory!!!!