export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const hexToRgb = (hexColor: string) => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

export const adjustColor = (hexColor: string, amount: number) => {
  const { r, g, b } = hexToRgb(hexColor);
  const nr = clamp(r + amount, 0, 255);
  const ng = clamp(g + amount, 0, 255);
  const nb = clamp(b + amount, 0, 255);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
};

export const getBrightness = (hexColor: string) => {
  const { r, g, b } = hexToRgb(hexColor);
  // Perceived brightness formula
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const ensureBackgroundContrast = (hexColor: string) => {
  const brightness = getBrightness(hexColor);
  if (brightness > 190) {
    return adjustColor(hexColor, -70);
  }
  if (brightness > 170) {
    return adjustColor(hexColor, -45);
  }
  return hexColor;
};

export const createAdaptiveGradient = (hexColor: string) => {
  const safeBase = ensureBackgroundContrast(hexColor);
  const lighter = adjustColor(safeBase, 30);
  return `linear-gradient(135deg, ${safeBase} 0%, ${lighter} 100%)`;
};
