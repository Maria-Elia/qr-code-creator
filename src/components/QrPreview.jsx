import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
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

const QrPreview = forwardRef(function QrPreview({ options }, ref) {
  const containerRef = useRef(null);
  const qrRef = useRef(null);

  useImperativeHandle(ref, () => ({
    download() {
      if (qrRef.current) {
        qrRef.current.download({ name: 'qr-code', extension: 'png' });
      }
    },
  }));

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
    const timer = setTimeout(() => {
      if (qrRef.current) {
        qrRef.current.update(toLibraryOptions(options));
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [options]);

  return <div className="qr-preview" ref={containerRef} />;
});

export default QrPreview;
export { toLibraryOptions };
