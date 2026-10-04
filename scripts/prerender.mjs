// Gera o HTML final: renderiza o App no Node e injeta o resultado em dist/index.html.
// Assim o conteúdo chega pronto para buscadores e a foto do hero aparece antes do JS.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = `${root}dist/index.html`;
const serverDir = `${root}dist-server`;

const { render } = await import(pathToFileURL(`${serverDir}/entry-server.js`).href);
const template = await readFile(indexPath, 'utf8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('Marcador <!--app-html--> não encontrado em dist/index.html');
}

await writeFile(indexPath, template.replace('<!--app-html-->', render()));
await rm(serverDir, { recursive: true, force: true });

console.log('✓ dist/index.html pré-renderizado');
