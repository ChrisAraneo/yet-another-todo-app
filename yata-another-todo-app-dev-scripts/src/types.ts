export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface HsColor {
  hue: number;
  saturation: number;
}

export interface Config {
  unit: number;
  palettes: {
    lightness: number;
    primary: HsColor;
    secondary: HsColor;
    red: HsColor;
    gray: HsColor;
  };
}
