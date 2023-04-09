import { readFile } from '../utils';

async function getFile(file?: File) {
  const contents = await readFile(file);
  postMessage(contents);
}

onmessage = e => {
  void getFile(e.data);
};
