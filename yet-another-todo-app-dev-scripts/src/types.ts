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
  borderRadius: string;
  columnWidthInUnits: number;
  palettes: {
    lightness: number;
    primary: HsColor;
    secondary: HsColor;
    red: HsColor;
    green: HsColor;
    orange: HsColor;
    gray: HsColor;
  };
  modals: {
    widthInUnits: number;
    heightInUnits: number;
    borderRadius: string;
  };
}
