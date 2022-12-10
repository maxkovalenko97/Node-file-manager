function showCurrentDirectory(arg) {
  let dir = arg ? arg : process.cwd();
  process.stdout.write(`You are currently in ${dir}\n`);
}

export { showCurrentDirectory };