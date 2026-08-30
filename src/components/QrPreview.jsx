import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

function toLibraryOptions(options) {
  const dots = { ...options.dotsOptions };
  if (dots.gradient) {
    delete dots.color;
  } else {
    delete dots.gradient;
  }
  return {
    width: options.width,
    height: options.height,
    margin: options.margin,
    type: 'canvas',
    data: options.data || ' ',
    image: options.image || undefined,
    dotsOptions: dots,
    cornersSquareOptions: options.cornersSquareOptions,
    cornersDotOptions: options.cornersDotOptions,
    backgroundOptions: options.backgroundOptions,
    imageOptions: options.imageOptions,
  };
}

export default function QrPreview({ options }) {
  const containerRef = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    qrRef.current = new QRCodeStyling(toLibraryOptions(options));
    if (containerRef.current) {
      qrRef.current.append(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.update(toLibraryOptions(options));
    }
  }, [options]);

  return <div className="qr-preview" ref={containerRef} />;
}

export { toLibraryOptions };
