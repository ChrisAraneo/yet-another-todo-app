import fs from 'node:fs';
import Path from 'path';

export function readFile(path: string): string {
  return fs.readFileSync(Path.normalize(process.cwd() + path), 'utf8');
}

export function writeFile(path: string, output: string): void {
  const outputPath = Path.normalize(process.cwd() + '/../' + path);

  fs.writeFile(outputPath, output, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
