import { RgbColor } from './types';

export function hslToHex(input: { h: number; s: number; l: number }): string {
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

export function hexToRgb(hex: string): RgbColor {
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

export function contrast(input: { h: number; s: number; l: number }): string {
  const rgb = hexToRgb(hslToHex(input));
  const o = Math.round((rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000);

  return o <= 130 ? '#ffffff' : '#000000';
}
