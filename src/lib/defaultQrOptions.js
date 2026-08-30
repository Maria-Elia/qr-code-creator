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
  };
}
