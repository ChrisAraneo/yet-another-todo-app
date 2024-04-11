import materialPalette from 'material-palette';
import fs from 'node:fs';
import Path from 'path';

interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

interface HsColor {
  hue: number;
  saturation: number;
}

interface Config {
  unit: number;
  lightness: number;
  primary: HsColor;
  secondary: HsColor;
  red: HsColor;
  gray: HsColor;
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

function hexToRgb(hex: string): RgbColor {
  const _hex = hex.replace('#', '');
  const bigint = parseInt(_hex, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;

  return {
    red,
    green,
    blue,
  };
}

function contrast(input: { h: number; s: number; l: number }): string {
  const rgb = hexToRgb(hslToHex(input));
  const o = Math.round((rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000);

  return o <= 130 ? '#ffffff' : '#000000';
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

  const colorPalettes = `${disclaimer}
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
    50: ${contrast(primary['50'])},
    100: ${contrast(primary['100'])},
    200: ${contrast(primary['200'])},
    300: ${contrast(primary['300'])},
    400: ${contrast(primary['400'])},
    500: ${contrast(primary['500'])},
    600: ${contrast(primary['600'])},
    700: ${contrast(primary['700'])},
    800: ${contrast(primary['800'])},
    900: ${contrast(primary['900'])},
    A100: ${contrast(primary['A100'])},
    A200: ${contrast(primary['A200'])},
    A400: ${contrast(primary['A400'])},
    A700: ${contrast(primary['A700'])},
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
    50: ${contrast(secondary['50'])},
    100: ${contrast(secondary['100'])},
    200: ${contrast(secondary['200'])},
    300: ${contrast(secondary['300'])},
    400: ${contrast(secondary['400'])},
    500: ${contrast(secondary['500'])},
    600: ${contrast(secondary['600'])},
    700: ${contrast(secondary['700'])},
    800: ${contrast(secondary['800'])},
    900: ${contrast(secondary['900'])},
    A100: ${contrast(secondary['A100'])},
    A200: ${contrast(secondary['A200'])},
    A400: ${contrast(secondary['A400'])},
    A700: ${contrast(secondary['A700'])},
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
    50: ${contrast(red['50'])},
    100: ${contrast(red['100'])},
    200: ${contrast(red['200'])},
    300: ${contrast(red['300'])},
    400: ${contrast(red['400'])},
    500: ${contrast(red['500'])},
    600: ${contrast(red['600'])},
    700: ${contrast(red['700'])},
    800: ${contrast(red['800'])},
    900: ${contrast(red['900'])},
    A100: ${contrast(red['A100'])},
    A200: ${contrast(red['A200'])},
    A400: ${contrast(red['A400'])},
    A700: ${contrast(red['A700'])},
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
    50: ${contrast(gray['50'])},
    100: ${contrast(gray['100'])},
    200: ${contrast(gray['200'])},
    300: ${contrast(gray['300'])},
    400: ${contrast(gray['400'])},
    500: ${contrast(gray['500'])},
    600: ${contrast(gray['600'])},
    700: ${contrast(gray['700'])},
    800: ${contrast(gray['800'])},
    900: ${contrast(gray['900'])},
    A100: ${contrast(gray['A100'])},
    A200: ${contrast(gray['A200'])},
    A400: ${contrast(gray['A400'])},
    A700: ${contrast(gray['A700'])},
  ),
);
`;

  writeFile('src/app/shared/styles/palettes.__generated.scss', colorPalettes);

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
