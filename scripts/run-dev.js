const { spawn } = require('child_process');

const npmExec = process.env.npm_execpath;
if (!npmExec) {
  console.error('npm_execpath is not available. Run this script via npm run dev.');
  process.exit(1);
}

const run = (name, args) => {
  const child = spawn(process.execPath, [npmExec, ...args], {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      process.exit(code ?? 1);
    }
  });

  child.on('error', (error) => {
    console.error(`${name} failed to start:`, error.message);
    process.exit(1);
  });

  return child;
};

const client = run('client', ['run', 'dev', '--prefix', 'client']);
const server = run('server', ['run', 'dev', '--prefix', 'server']);

const stopAll = () => {
  client.kill();
  server.kill();
};

process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);
