export const BRAND_INK = '#22343d';

export function createDefaultQrOptions() {
  return {
    data: 'https://example.com',
    width: 300,
    height: 300,
    margin: 10,
    dotsOptions: { type: 'square', color: BRAND_INK, gradient: null },
    cornersSquareOptions: { type: 'square', color: BRAND_INK },
    cornersDotOptions: { type: 'square', color: BRAND_INK },
    eyesColorMode: 'same',
    backgroundOptions: { color: '#ffffff' },
    image: null,
    imageOptions: { crossOrigin: 'anonymous', margin: 4, imageSize: 0.4 },
    frame: {
      style: 'none',
      borderColor: BRAND_INK,
      fillColor: BRAND_INK,
      text: 'SCAN ME',
      font: 'Arial',
      textColor: '#ffffff',
      plainTextColor: BRAND_INK,
      bandTextColor: '#000000',
    },
  };
}
