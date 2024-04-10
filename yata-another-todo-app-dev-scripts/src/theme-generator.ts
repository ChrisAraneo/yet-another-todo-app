import materialPalette from 'material-palette';
import fs from 'node:fs';
import Path from 'path';

interface Color {
  hue: number;
  saturation: number;
}

interface Config {
  unit: number;
  lightness: number;
  primary: Color;
  secondary: Color;
  red: Color;
  gray: Color;
}

function hslToHex(input: { h: number; s: number; l: number }): string {
  const { h, s } = input;
  let l = input.l;

  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number): string => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function readFile(path: string): string {
  return fs.readFileSync(Path.normalize(process.cwd() + path), 'utf8');
}

function writeFile(path: string, output: string): void {
  const outputPath = Path.normalize(process.cwd() + '/../yet-another-todo-app-frontend/' + path);

  fs.writeFile(outputPath, output, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function main(): void {
  const config: Config = JSON.parse(readFile('/dist/theme-config.json')) as Config;
  const unit = 64;
  const lightness = config.lightness;
  const primary = materialPalette({
    h: config.primary.hue,
    s: config.primary.saturation,
    l: lightness,
  });
  const secondary = materialPalette({
    h: config.secondary.hue,
    s: config.secondary.saturation,
    l: lightness,
  });
  const red = materialPalette({
    h: config.red.hue,
    s: config.red.saturation,
    l: lightness,
  });
  const gray = materialPalette({
    h: config.gray.hue,
    s: config.gray.saturation,
    l: lightness + 12,
  });

  const disclaimer = `/*\n * THIS FILE WAS GENERATED USING SCRIPT.\n * DON'T MODIFY IT.\n * IF YOU NEED TO CHANGE VALUES THEN EXECUTE THE SCRIPT AGAIN.\n */`;

  const colorPalletes = `${disclaimer}
$yata-palette-primary: (
  50: ${hslToHex(primary['50'])},
  100: ${hslToHex(primary['100'])},
  200: ${hslToHex(primary['200'])},
  300: ${hslToHex(primary['300'])},
  400: ${hslToHex(primary['400'])},
  500: ${hslToHex(primary['500'])},
  600: ${hslToHex(primary['600'])},
  700: ${hslToHex(primary['700'])},
  800: ${hslToHex(primary['800'])},
  900: ${hslToHex(primary['900'])},
  A100: ${hslToHex(primary['A100'])},
  A200: ${hslToHex(primary['A200'])},
  A400: ${hslToHex(primary['A400'])},
  A700: ${hslToHex(primary['A700'])},
  contrast: (
    50: #000000,
    100: #000000,
    200: #000000,
    300: #ffffff,
    400: #ffffff,
    500: #ffffff,
    600: #ffffff,
    700: #ffffff,
    800: #ffffff,
    900: #ffffff,
    A100: #000000,
    A200: #000000,
    A400: #ffffff,
    A700: #ffffff,
  ),
);

$yata-palette-secondary: (
  50: ${hslToHex(secondary['50'])},
  100: ${hslToHex(secondary['100'])},
  200: ${hslToHex(secondary['200'])},
  300: ${hslToHex(secondary['300'])},
  400: ${hslToHex(secondary['400'])},
  500: ${hslToHex(secondary['500'])},
  600: ${hslToHex(secondary['600'])},
  700: ${hslToHex(secondary['700'])},
  800: ${hslToHex(secondary['800'])},
  900: ${hslToHex(secondary['900'])},
  A100: ${hslToHex(secondary['A100'])},
  A200: ${hslToHex(secondary['A200'])},
  A400: ${hslToHex(secondary['A400'])},
  A700: ${hslToHex(secondary['A700'])},
  contrast: (
    50: #000000,
    100: #000000,
    200: #000000,
    300: #000000,
    400: #ffffff,
    500: #ffffff,
    600: #ffffff,
    700: #ffffff,
    800: #ffffff,
    900: #ffffff,
    A100: #000000,
    A200: #000000,
    A400: #ffffff,
    A700: #ffffff,
  ),
);

$yata-palette-red: (
  50: ${hslToHex(red['50'])},
  100: ${hslToHex(red['100'])},
  200: ${hslToHex(red['200'])},
  300: ${hslToHex(red['300'])},
  400: ${hslToHex(red['400'])},
  500: ${hslToHex(red['500'])},
  600: ${hslToHex(red['600'])},
  700: ${hslToHex(red['700'])},
  800: ${hslToHex(red['800'])},
  900: ${hslToHex(red['900'])},
  A100: ${hslToHex(red['A100'])},
  A200: ${hslToHex(red['A200'])},
  A400: ${hslToHex(red['A400'])},
  A700: ${hslToHex(red['A700'])},
  contrast: (
    50: #000000,
    100: #000000,
    200: #000000,
    300: #000000,
    400: #ffffff,
    500: #ffffff,
    600: #ffffff,
    700: #ffffff,
    800: #ffffff,
    900: #ffffff,
    A100: #000000,
    A200: #000000,
    A400: #000000,
    A700: #000000,
  ),
);

$yata-palette-grey: (
  50: ${hslToHex(gray['50'])},
  100: ${hslToHex(gray['100'])},
  200: ${hslToHex(gray['200'])},
  300: ${hslToHex(gray['300'])},
  400: ${hslToHex(gray['400'])},
  500: ${hslToHex(gray['500'])},
  600: ${hslToHex(gray['600'])},
  700: ${hslToHex(gray['700'])},
  800: ${hslToHex(gray['800'])},
  900: ${hslToHex(gray['900'])},
  A100: ${hslToHex(gray['A100'])},
  A200: ${hslToHex(gray['A200'])},
  A400: ${hslToHex(gray['A400'])},
  A700: ${hslToHex(gray['A700'])},
  contrast: (
    50: #000000,
    100: #000000,
    200: #000000,
    300: #000000,
    400: #000000,
    500: #000000,
    600: #000000,
    700: #000000,
    800: #000000,
    900: #000000,
    A100: #000000,
    A200: #000000,
    A400: #000000,
    A700: #000000,
  ),
);
`;

  writeFile('src/app/shared/styles/palletes.__generated.scss', colorPalletes);

  let units = `${disclaimer}
$_64unit: ${unit}px;\n\n$_1unit: ${unit / 64}px;`;

  for (let i = 2; i <= 48; i += 2) {
    units += `\n$_${i}unit: ${i}px;`;
  }

  units += `\n\n$_128unit: $_64unit * 2;
$_160unit: $_128unit + $_32unit;
$_192unit: $_64unit * 3;
$_256unit: $_64unit * 4;
`;

  writeFile('src/app/shared/styles/units.__generated.scss', units);

  const tsConsts = `${disclaimer}
export const UNIT = ${unit};
export const COLUMN_WIDTH = ${unit * 3};

export const COLOR_ACCENT = '${hslToHex(secondary['600'])}';
export const COLOR_DANGER = '${hslToHex(red['600'])}';
export const COLOR_WARNING = 'orange'; // TODO
export const COLOR_TEXT = 'black'; // TODO
export const COLOR_DISABLED = '#888888'; // TODO

export const BORDER_COLOR = '${hslToHex(gray['200'])}';
export const BORDER = \`1px solid ${hslToHex(gray['200'])}\`;

export const DIALOG_WIDTH = \`\${UNIT * 15}px\`;
export const DIALOG_HEIGHT = \`\${UNIT * 9}px\`;
`;

  writeFile('src/app/shared/styles/theme.__generated.ts', tsConsts);
}

main();
