import showCurrentDirectory from "../utils.js";
import os from 'os';

const possibleArgs = [
  '--EOL', '--cpus', '--homedir', '--username', '--architecture',
];

export default async function goOs(param) {
  const arg = param;
  if (!param) {
    console.error('Invalid input');
    showCurrentDirectory();
    return;
  }

  if (!possibleArgs.includes(arg)) {
    console.log('Invalid input. Incorrect argument');
    showCurrentDirectory();
    return;
  }

  switch (arg) {
    case '--EOL':
      console.log(`End-of-line marker : ${JSON.stringify(os.EOL)}`);
      showCurrentDirectory();
      break;
    case '--cpus':
      getCpus();
      break;
    case '--homedir':
      console.log(`Homedir is : ${os.homedir()}`);
      showCurrentDirectory();
      break;
    case '--username':
      console.log(`Username is: ${os.userInfo().username}`);
      showCurrentDirectory();
      break;
    case '--architecture':
      console.log(`Your architecture: ${os.arch()}`);
      showCurrentDirectory();
      break;
  }
}

function getCpus() {
  const cpusInfo = os.cpus().map(({ model, speed }) => ({
    model,
    speed: `${speed / 1000}GHz`
  }));
  console.log(`Overall amount of CPUS: ${cpusInfo.length}`)
  console.table(cpusInfo);
  showCurrentDirectory();
}