import * as OS from 'node:os';

export function os(key) {
  key = key.slice(2);
  switch (key) {
    case 'EOL':
      console.log(JSON.stringify(OS.EOL));
      break;
    case 'cpus':
      showCpusInfo();
      break;
    case 'homedir':
      console.log(OS.homedir());
      break;
    case 'username':
      console.log(OS.userInfo().username);
      break;
    case 'architecture':
      console.log(OS.arch());
      break;
    default:
      throw new Error('Invalid input');
  }
}

function showCpusInfo() {
  const cpus = OS.cpus();
  console.log(`Overall amount of CPUS: ${cpus.length}`);
  const listCpus = [];
  cpus.forEach((s) => {
    listCpus.push({ model: s.model, 'clock rate': s.speed / 1000 + ' GHz' });
  });
  console.table(listCpus);
}
