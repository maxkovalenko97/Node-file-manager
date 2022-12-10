import { chdir } from "process";
import { showCurrentDirectory } from "../utils.js";

export default function goUp() {
  chdir('..');
  showCurrentDirectory();
}