import os, { homedir } from "os";
import readline from "readline";
import { showCurrentDirectory } from "./utils.js";
import EventEmitter from "events";

const input = process.stdin;
const output = process.stdout;

import goUp from "./commands/commandUp.js";
import goCd from "./commands/commandCd.js";
import goLs from "./commands/commandLs.js";

process.chdir(homedir()); // change directory

const parsedArgs = Object.fromEntries(process.argv.slice(2).map((arg) => {
  return arg.split('=');
}));

const username = parsedArgs['--username'] ? parsedArgs['--username'] : 'Dear Guest';

output.write(`\nWelcome to the File Manager, ${username}!\n`);

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
        goUp();
        break;
      case 'cd':
        goCd(args[0]);
        break;
      case 'ls':
        goLs();
        break;
      default:
        console.log('Invalid input');
    }
  })

// const myEmitter = new EventEmitter();
// myEmitter.on('event', (...args) => console.log('emit!!!!', args.join('')));
// myEmitter.emit('event', 'saasd', 2, null);
