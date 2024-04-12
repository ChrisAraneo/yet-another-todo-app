import materialPalette from 'material-palette';

import { Config } from './types';
import { readFile, writeFile } from './file-system-utils';
import { contrast, hslToHex } from './color-utils';

function main(): void {
  const config: Config = JSON.parse(readFile('/dist/theme-config.json')) as Config;
  const unit = 64;
  const lightness = config.palettes.lightness;
  const primary = materialPalette({
    h: config.palettes.primary.hue,
    s: config.palettes.primary.saturation,
    l: lightness,
  });
  const secondary = materialPalette({
    h: config.palettes.secondary.hue,
    s: config.palettes.secondary.saturation,
    l: lightness,
  });
  const red = materialPalette({
    h: config.palettes.red.hue,
    s: config.palettes.red.saturation,
    l: lightness,
  });
  const gray = materialPalette({
    h: config.palettes.gray.hue,
    s: config.palettes.gray.saturation,
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

export const PRIMARY_COLOR = '${hslToHex(secondary['600'])}';
${((): string => {
  let result = '';

  for (const key in primary) {
    result += `export const COLOR_PRIMARY_${key} = '${hslToHex(primary[key])}';\n`;
  }

  return result;
})()}
export const SECONDARY_COLOR = '${hslToHex(secondary['600'])}';
${((): string => {
  let result = '';

  for (const key in primary) {
    result += `export const COLOR_SECONDARY_${key} = '${hslToHex(secondary[key])}';\n`;
  }

  return result;
})()}
export const DANGER_COLOR = '${hslToHex(red['600'])}';
${((): string => {
  let result = '';

  for (const key in primary) {
    result += `export const COLOR_DANGER_${key} = '${hslToHex(red[key])}';\n`;
  }

  return result;
})()}
export const GRAY_COLOR = '${hslToHex(gray['600'])}';
${((): string => {
  let result = '';

  for (const key in primary) {
    result += `export const COLOR_GRAY_${key} = '${hslToHex(gray[key])}';\n`;
  }

  return result;
})()}
export const SUCCESS_COLOR = 'green'; // TODO
export const WARNING_COLOR = 'orange'; // TODO
export const STANDARD_TEXT_COLOR = '${hslToHex(gray['700'])}';
export const DISABLED_COLOR = '${hslToHex(gray['400'])}';

export const BORDER_COLOR = '${hslToHex(gray['200'])}';
export const BORDER = \`1px solid ${hslToHex(gray['200'])}\`;

export const DIALOG_WIDTH = \`\${UNIT * 15}px\`; // TODO
export const DIALOG_HEIGHT = \`\${UNIT * 9}px\`; // TODO
`;

  writeFile('src/app/shared/styles/theme.__generated.ts', tsConsts);
}

main();
