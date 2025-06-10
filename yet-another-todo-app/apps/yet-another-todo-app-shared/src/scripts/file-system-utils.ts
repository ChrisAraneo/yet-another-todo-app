import fs from 'node:fs';
import Path from 'node:path';

export const readFile = (path: string): string => fs.readFileSync(Path.normalize(process.cwd() + path), 'utf8')

export const writeFile = (path: string, output: string): void => {
  const outputPath = Path.normalize(`${process.cwd()}/../${path}`);

  fs.writeFile(outputPath, output, (error: unknown) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
}
