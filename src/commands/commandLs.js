// import { readdir } from 'fs';
import { readdir } from 'fs/promises';
import showCurrentDirectory from "../utils.js";

export default async function goLs() {
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true });
    files.forEach(elem => {
      if (elem.isDirectory()) elem['type'] = 'directory'
      else elem['type'] = 'file';
    });
    console.table(files);
    showCurrentDirectory();
  } catch (err) {
    console.error("FS operation failed");
  }
}