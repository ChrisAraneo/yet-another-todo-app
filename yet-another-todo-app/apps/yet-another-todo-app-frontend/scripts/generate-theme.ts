import { get } from 'lodash';

import { contrast, hslToHex } from './utils/color-utils';
import { readFile, writeFile } from './utils/file-system-utils';
import { Config } from './utils/interfaces';

const materialPalette = require('material-palette');

const themeJsonPath = '/src/app/shared/styles/theme.json';
const stylesPath = '/yet-another-todo-app-frontend/src/app/shared/styles/';

// TODO: Refactor

function mapColorPaletteToScssMap(palette: object, name: string): string {
  let result = `$yata-palette-${name.toLocaleLowerCase()}: (\n`;

  for (const key in palette) {
    result += `  ${key}: ${hslToHex(get(palette, key))},\n`;
  }

  result += '  contrast: (\n';

  for (const key in palette) {
    result += `    ${key}: ${contrast(get(palette, key))},\n`;
  }

  result += '  ),\n);\n';

  return result;
}

function mapColorPaletteToConsts(palette: object, name: string): string {
  let result = '';

  for (const key in palette) {
    result += `export const COLOR_${name.toLocaleUpperCase()}_${key} = '${hslToHex(get(palette, key))}';\n`;
  }

  return result;
}

function main(): void {
  const config: Config = JSON.parse(
    readFile(themeJsonPath),
  ) as Config;

  const unit = 64;
  const { borderRadius } = config;
  const { columnWidthInUnits } = config;
  const { modals } = config;

  const { lightness } = config.palettes;
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
    l: lightness + 12,
  });
  const green = materialPalette({
    h: config.palettes.green.hue,
    s: config.palettes.green.saturation,
    l: lightness + 12,
  });
  const orange = materialPalette({
    h: config.palettes.orange.hue,
    s: config.palettes.orange.saturation,
    l: lightness + 12,
  });
  const gray = materialPalette({
    h: config.palettes.gray.hue,
    s: config.palettes.gray.saturation,
    l: lightness + 12,
  });
  const successColor = hslToHex(green['700']);
  const warningColor = hslToHex(orange['700']);

  const disclaimer = `/*\n * THIS FILE WAS GENERATED USING SCRIPT.\n * DON'T MODIFY IT.\n * IF YOU NEED TO CHANGE VALUES THEN EXECUTE THE SCRIPT AGAIN.\n */`;

  const palettes = `
${mapColorPaletteToScssMap(primary, 'primary')}
${mapColorPaletteToScssMap(secondary, 'secondary')}
${mapColorPaletteToScssMap(red, 'red')}
${mapColorPaletteToScssMap(gray, 'gray')}
`;

  let units = `
$_64unit: ${unit}px;\n\n$_1unit: ${unit / 64}px;`;

  for (let i = 2; i <= 48; i += 2) {
    units += `\n$_${i}unit: ${i}px;`;
  }

  units += `\n\n$_128unit: $_64unit * 2;
$_160unit: $_128unit + $_32unit;
$_192unit: $_64unit * 3;
$_256unit: $_64unit * 4;
`;

  const tsConsts = `${disclaimer}
export const UNIT = ${unit};
export const COLUMN_WIDTH = ${unit * 3};

export const PRIMARY_COLOR = '${hslToHex(secondary['600'])}';
${mapColorPaletteToConsts(primary, 'PRIMARY')}
export const SECONDARY_COLOR = '${hslToHex(secondary['600'])}';
${mapColorPaletteToConsts(secondary, 'SECONDARY')}
export const DANGER_COLOR = '${hslToHex(red['600'])}';
${mapColorPaletteToConsts(red, 'DANGER')}
export const GRAY_COLOR = '${hslToHex(gray['600'])}';
${mapColorPaletteToConsts(gray, 'GRAY')}
export const SUCCESS_COLOR = '${successColor}';
export const WARNING_COLOR = '${warningColor}';
export const STANDARD_TEXT_COLOR = '${hslToHex(gray['700'])}';
export const DISABLED_COLOR = '${hslToHex(gray['400'])}';

export const BORDER_COLOR = '${hslToHex(gray['200'])}';
export const BORDER = \`1px solid ${hslToHex(gray['200'])}\`;

export const DIALOG_WIDTH = \`\${UNIT * ${modals.widthInUnits}}px\`;
export const DIALOG_HEIGHT = \`\${UNIT * ${modals.heightInUnits}}px\`;
export const DIALOG_BORDER_RADIUS = \`${modals.borderRadius}\`;
`;

  writeFile(`${stylesPath}/theme.__generated.ts`, tsConsts);

  const colors = `
@use "sass:map";
@use 'sass:math';

${units}
${palettes}

// GENERAL COLORS
$background-color: map.get($yata-palette-gray, 50);
$border-color: map.get($yata-palette-gray, 200);
$primary-color: map.get($yata-palette-primary, 600);
$secondary-color: map.get($yata-palette-secondary, 600);
$success-color: ${successColor};
$danger-color: map.get($yata-palette-red, 600);
$warning-color: ${warningColor};
$disabled-color: map.get($yata-palette-gray, 400);

// TEXT COLORS
$title-text-color: map.get($yata-palette-gray, 900);
$subtitle-text-color: map.get($yata-palette-gray, 700);
$label-text-color: map.get($yata-palette-gray, 600);
$standard-text-color: map.get($yata-palette-gray, 800);

// FORM COLORS
$form-label-color: map.get($yata-palette-gray, 600);
$form-input-text-color: $standard-text-color;
$form-input-border-color: map.get($yata-palette-gray, 400);
$form-input-focus-border-color: $primary-color;

`;

  const variables = `${disclaimer}
${colors}

// GENERAL VARIABLES
$border: 1px solid $border-color;
$border-radius: ${borderRadius};

// TIMELINE
$column-width: $_64unit * ${columnWidthInUnits};

// MODALS & DIALOG WINDOWS
$dialog-width: $_64unit * ${modals.widthInUnits};
$dialog-height: $_64unit * ${modals.heightInUnits};
$dialog-border-radius: ${modals.borderRadius};

// FORMS
$form-input-border-radius: $_6unit;
$form-input-border: 1px solid $form-input-border-color;
$form-input-focus-border: 1px solid $form-input-focus-border-color;
$form-input-background: darken($background-color, 0.7%) !important;
$form-input-focus-background: rgba(map.get($yata-palette-primary, 50), 0.33) !important;

`;

  writeFile(`${stylesPath}/variables.__generated.scss`, variables);
}

main();
