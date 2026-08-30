function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function channelLuminance(value) {
  const v = value / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

export function contrastRatio(hexA, hexB) {
  const la = relativeLuminance(hexToRgb(hexA));
  const lb = relativeLuminance(hexToRgb(hexB));
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function dotForegroundColors(qrOptions) {
  if (qrOptions.dotsOptions.gradient) {
    return qrOptions.dotsOptions.gradient.colorStops.map((stop) => stop.color);
  }
  return [qrOptions.dotsOptions.color];
}

function eyeForegroundColors(qrOptions) {
  if (qrOptions.eyesColorMode === 'custom') {
    return [qrOptions.cornersSquareOptions.color, qrOptions.cornersDotOptions.color];
  }
  return dotForegroundColors(qrOptions).slice(0, 1);
}

export function checkQrContrast(qrOptions) {
  if (qrOptions.backgroundOptions.transparent) {
    return { skipped: true };
  }

  const background = qrOptions.backgroundOptions.color;
  const foregroundColors = [...dotForegroundColors(qrOptions), ...eyeForegroundColors(qrOptions)];

  let worstRatio = Infinity;
  for (const color of foregroundColors) {
    const ratio = contrastRatio(color, background);
    if (ratio < worstRatio) worstRatio = ratio;
  }

  let level = 'good';
  if (worstRatio < 2) level = 'poor';
  else if (worstRatio < 4.5) level = 'warning';

  return { skipped: false, ratio: worstRatio, level };
}
