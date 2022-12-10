import { chdir } from "process";
import { showCurrentDirectory } from "../utils.js";

export default function goCd(directory) {
  try {
    chdir(directory);
    showCurrentDirectory();
  } catch (error) {
    console.log('Operation failed')
  }
}