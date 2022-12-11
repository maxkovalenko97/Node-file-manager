import showCurrentDirectory from "../utils.js";
import fs from 'fs';
import { resolve } from "path";

export default async function goCat(pathFile) {
  try {
    const resolvedPath = resolve(pathFile);
    const readableStream = fs.createReadStream(resolvedPath, 'utf-8');
    readableStream.on('error', () => console.error('Operation failed'));
    readableStream.on('data', chunk => console.log(chunk));
    await readableStream.on('end', () => showCurrentDirectory());
  } catch (error) {
    console.error('Operation failed')
  }
}