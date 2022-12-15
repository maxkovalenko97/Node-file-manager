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
    const sortedArr = files.sort().sort((elem1, elem2) => {
      if (elem1.type > elem2.type) return 1;
      if (elem1.type == elem2.type) return 0;
      if (elem1.type < elem2.type) return -1;
    });
    console.table(sortedArr);
    showCurrentDirectory();
  } catch (err) {
    console.error("FS operation failed");
    showCurrentDirectory();
  }
}