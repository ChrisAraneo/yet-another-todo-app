import materialPalette from 'material-palette';
import fs from 'node:fs';
import path from 'path';

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

function main(): void {
  const lightness = 40;
  const primary = materialPalette({ h: 212, s: 100, l: lightness });
  const secondary = materialPalette({ h: 162, s: 100, l: lightness });
  const red = materialPalette({ h: 2, s: 100, l: lightness });
  const gray = materialPalette({ h: 212, s: 10, l: lightness + 12 });

  const output = `/*
 * THIS FILE WAS GENERATED USING SCRIPT.
 * DON'T MODIFY IT.
 * IF YOU NEED TO CHANGE VALUES THEN EXECUTE THE SCRIPT AGAIN.
*/
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

  const outputPath = path.normalize(
    process.cwd() +
      '/../yet-another-todo-app-frontend/src/app/shared/styles/palletes.__generated.scss',
  );

  fs.writeFile(outputPath, output, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
