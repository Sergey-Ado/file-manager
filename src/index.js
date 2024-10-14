import { getUsername, parseInput, showCurrentDir } from './modules/utils.js';
import { controller } from './modules/controller.js';

try {
  const username = getUsername();

  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentDir();
  process.stdout.write('> ');

  process.stdin.on('data', async (data) => {
    const parse = parseInput(data.toString());
    if (parse[0] == '.exit') {
      process.exit(1);
    }
    await controller(parse);
    showCurrentDir();
    process.stdout.write('> ');
  });

  process.on('exit', () => {
    console.log('');
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });

  process.on('SIGINT', () => {
    process.exit(1);
  });
} catch (e) {
  console.error(e.message);
}
