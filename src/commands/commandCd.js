import { chdir } from "process";
import showCurrentDirectory from "../utils.js";
import path from "path";

export default function goCd(directory) {
  let dir = directory;

  try {
    if (dir.length === 2 && dir.slice(1) === ':') {   // change c:  to  c:/
      dir = path.join(directory, '\\');
    }
    chdir(dir);
    showCurrentDirectory();
  } catch (error) {
    console.error('Operation failed. Incorrect path');
    showCurrentDirectory();
  }
}