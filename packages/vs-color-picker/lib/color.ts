export interface Color {
  r: number,
  g: number,
  b: number,
  alpha: number,
}

export enum ColorType {
  hex,
  rgb,
  hsl,
  // hsv,
  // vec,
  uicolor,
}

export const htmlColorNames = [
  'indianred',
  'lightcoral',
  'salmon',
  'darksalmon',
  'lightsalmon',
  'lavender',
  'slategray',
];

export function random(): Color {
  return {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
    alpha: 1,
  }
}

export function parse(color: string): [ColorType, Color] {
  if (color.startsWith('#')) {
    // #rgb / #rgba
    if (color.length === 4 || color.length === 5) {
      return [ColorType.hex, {
        r: Math.max(Number.parseInt(color.slice(1,2), 16) * 16, 255),
        g: Math.max(Number.parseInt(color.slice(2,3), 16) * 16, 255),
        b: Math.max(Number.parseInt(color.slice(3,4), 16) * 16, 255),
        alpha: color.length === 5 ? Number.parseInt(color.slice(4,5), 16) / 15 : 1,
      }];
    }

    // #rrggbb / #rrggbbaa
    else if (color.length === 7 || color.length === 9) {
      return [ColorType.hex, {
        r: Number.parseInt(color.slice(1,3), 16),
        g: Number.parseInt(color.slice(3,5), 16),
        b: Number.parseInt(color.slice(5,7), 16),
        alpha: color.length === 9 ? Number.parseInt(color.slice(7,9), 16) / 255 : 1,
      }];
    }
  }

  // rgb(r, g, b) / rgba(r, g, b, a)
  else if (color.startsWith('rgb')) {
    let hasAlpha = color[3] === 'a';
    let [r, g, b, alpha] = color.slice(hasAlpha ? 5 : 4, -1).split(',');

    return [ColorType.rgb, {
      r: Number.parseInt(r),
      g: Number.parseInt(g),
      b: Number.parseInt(b),
      alpha: hasAlpha ? Number.parseFloat(alpha) : 1,
    }];
  }

  // hsl(h, s%, l%)
  else if (color.startsWith('hsl')) {
    return [ColorType.hsl, {
      r: 0,
      g: 0,
      b: 0,
      alpha: 1,
    }];
  }

  return [ColorType.hex, random()];
}

// Helper function for formatting hex colors
function hp(value: number): string {
  return Math.floor(value).toString(16).padStart(2, '0');
}

export function hex(color: Color): string {
  return color.alpha < 1
    ? `#${hp(color.r)}${hp(color.g)}${hp(color.b)}${hp(color.alpha * 255)}`
    : `#${hp(color.r)}${hp(color.g)}${hp(color.b)}`;
}

// Helper function for formatting rgba/rgba/hsl colors
function rp(value: number): string {
  return Math.floor(value).toString();
}

export function rgb(color: Color): string {
  return color.alpha < 1
    ? `rgba(${rp(color.r)}, ${rp(color.g)}, ${rp(color.b)}, ${color.alpha.toString().slice(0,4)})`
    : `rgb(${rp(color.r)}, ${rp(color.g)}, ${rp(color.b)})`;
}

export function hsl(color: Color): string {
  return color.alpha < 1
    ? `hsla(${color.r}, 42%, 63%, ${up(color.alpha)})`
    : `hsl(${color.r}, 42%, 63%)`;
}

function up(value: number): string {
  return value.toString().slice(0,4);
}

export function uicolor(color: Color): string {
  return `UIColor(red: ${up(color.r)}, green: ${up(color.g)}, blue: ${up(color.b)}, alpha: ${up(color.r)})`;
}

export default {
  ColorType,
  random,
  parse,
  hex,
  rgb,
  hsl,
};
