import os from "os";
import readline from "readline";
import showCurrentDirectory from "./utils.js";
import goUp from "./commands/commandUp.js";
import goCd from "./commands/commandCd.js";
import goLs from "./commands/commandLs.js";
import goCat from "./commands/commandCat.js";
import goAdd from "./commands/commandAdd.js";
import goRn from "./commands/commandRn.js";
import goCp from "./commands/commandCp.js";
import goMv from "./commands/commandMv.js";
import goRm from "./commands/commandRm.js";
import goOs from "./commands/commandOs.js";
import getHash from "./commands/getHash.js";
import compressFile from "./commands/compressFile.js";
import decompressFile from "./commands/decompressFile.js";

const input = process.stdin;
const output = process.stdout;

process.chdir(os.homedir());

const parsedArgs = Object.fromEntries(process.argv.slice(2).map((arg) => {
  return arg.split('=');
}));

const username = parsedArgs['--username'] ? parsedArgs['--username'] : 'Dear Guest';

output.write(`Welcome to the File Manager, ${username}!\n`);

showCurrentDirectory();

const rl = readline.createInterface({ input, output });

rl
  .on('SIGINT', () => rl.close())
  .on('close', () => output.write(`\nThank you for using File Manager, ${username}, goodbye!`))
  .on('line', data => {
    if (data === '.exit') {
      rl.close();
      return
    }

    else data = data.trim();
    let [command, ...args] = data.split(' ');

    switch (command) {
      case 'up':
        (args.length !== 0) ? showErrorArgs() : goUp();
        break;
      case 'cd':
        (args.length !== 1) ? showErrorArgs() : goCd(args[0]);
        break;
      case 'ls':
        (args.length !== 0) ? showErrorArgs() : goLs();
        break;
      case 'cat':
        (args.length !== 1) ? showErrorArgs() : goCat(args[0]);
        break;
      case 'add':
        (args.length !== 1) ? showErrorArgs() : goAdd(args[0]);
        break;
      case 'rn':
        (args.length !== 2) ? showErrorArgs() : goRn(args[0], args[1]);
        break;
      case 'cp':
        (args.length !== 2) ? showErrorArgs() : goCp(args[0], args[1]);
        break;
      case 'mv':
        (args.length !== 2) ? showErrorArgs() : goMv(args[0], args[1]);
        break;
      case 'rm':
        (args.length !== 1) ? showErrorArgs() : goRm(args[0]);
        break;
      case 'os':
        (args.length !== 1) ? showErrorArgs() : goOs(args[0]);
        break;
      case 'hash':
        (args.length !== 1) ? showErrorArgs() : getHash(args[0]);
        break;
      case 'compress':
        (args.length !== 2) ? showErrorArgs() : compressFile(args[0], args[1]);
        break;
      case 'decompress':
        (args.length !== 2) ? showErrorArgs() : decompressFile(args[0], args[1]);
        break;
      default:
        console.error('Invalid input. Unknown command');
        showCurrentDirectory();
    }
  })

function showErrorArgs() {
  console.error('Invalid input. Incorrect arguments');
  showCurrentDirectory();
}
