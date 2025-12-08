import { Injectable } from '@angular/core';
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from '@material/material-color-utilities';
import { set } from 'lodash';
import { COLOR_SHADES_KEYS } from './theme.consts';
import { ColorShades } from './theme.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setPrimaryColor(hex: string): void {
    const colorShades = this.generateHexColorShades(hex);
    this.setColorCssProperties('primary', colorShades);
  }

  setDangerColor(hex: string): void {
    const colorShades = this.generateHexColorShades(hex);
    this.setColorCssProperties('danger', colorShades);
  }

  setGhostColor(hex: string): void {
    const colorShades = this.generateRgbaColorShades(hex, 0.2);
    this.setColorCssProperties('ghost', colorShades);
  }

  private setColorCssProperties(
    colorName: 'primary' | 'danger' | 'ghost',
    colorShades: ColorShades,
  ): void {
    (Object.keys(colorShades) as (keyof ColorShades)[]).forEach(
      (key: keyof ColorShades) => {
        const cssVarName = `--yata-${colorName}-color-${key.replace('tone', '')}`;
        const cssVarValue = colorShades[key];

        document.documentElement.style.setProperty(cssVarName, cssVarValue);
      },
    );
  }

  private generateHexColorShades(hex: string): ColorShades {
    const tonalPalette = themeFromSourceColor(argbFromHex(hex)).palettes
      .primary;
    const result: Partial<ColorShades> = {} as ColorShades;

    COLOR_SHADES_KEYS.forEach((tone) => {
      set(
        result,
        tone,
        hexFromArgb(tonalPalette.tone(Number(tone.replace('tone', '')))),
      );
    });

    return result as ColorShades;
  }

  private generateRgbaColorShades(hex: string, alpha = 1): ColorShades {
    const tonalPalette = themeFromSourceColor(argbFromHex(hex)).palettes
      .neutral;
    const result: Partial<ColorShades> = {} as ColorShades;

    COLOR_SHADES_KEYS.forEach((tone) => {
      const hexTone = hexFromArgb(
        tonalPalette.tone(Number(tone.replace('tone', ''))),
      );
      const rgbaTone = this.hexToRgba(hexTone, alpha);

      set(result, tone, rgbaTone);
    });

    return result as ColorShades;
  }

  private hexToRgba(hex: string, alpha = 1): string {
    let result = hex.replace(/^#/, '');

    if (result.length === 3) {
      result = result
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const r = parseInt(result.substring(0, 2), 16);
    const g = parseInt(result.substring(2, 4), 16);
    const b = parseInt(result.substring(4, 6), 16);

    const normalizedAlpha = Math.max(0, Math.min(1, alpha));

    return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`;
  }
}
