import { forwardRef, useRef, useImperativeHandle } from 'react';
import QrPreview from './QrPreview.jsx';
import { FONT_STACKS } from '../lib/fontStacks.js';
import { buildFramedCanvas } from '../lib/buildFramedCanvas.js';

const FramePreview = forwardRef(function FramePreview({ options }, ref) {
  const innerRef = useRef(null);
  const { frame } = options;
  const fontFamily = FONT_STACKS[frame.font] || FONT_STACKS.Arial;

  useImperativeHandle(ref, () => ({
    download() {
      if (frame.style === 'none') {
        innerRef.current?.download();
        return;
      }
      const sourceCanvas = innerRef.current?.getCanvas();
      if (!sourceCanvas) return;
      const composite = buildFramedCanvas(sourceCanvas, frame);
      composite.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }, 'image/png');
    },
  }));

  if (frame.style === 'none') {
    return <QrPreview ref={innerRef} options={options} />;
  }

  if (frame.style === 'border') {
    return (
      <div className="frame-border" style={{ borderColor: frame.borderColor }}>
        <QrPreview ref={innerRef} options={options} />
      </div>
    );
  }

  if (frame.style === 'corner-marks') {
    return (
      <div className="frame-wrap">
        <div className="frame-corner-marks" style={{ color: frame.borderColor }}>
          <span className="corner-mark corner-tl" />
          <span className="corner-mark corner-tr" />
          <span className="corner-mark corner-bl" />
          <span className="corner-mark corner-br" />
          <QrPreview ref={innerRef} options={options} />
        </div>
        {frame.text && (
          <div className="frame-label-plain" style={{ color: frame.borderColor, fontFamily }}>
            {frame.text}
          </div>
        )}
      </div>
    );
  }

  if (frame.style === 'circle-viewfinder') {
    return (
      <div className="frame-wrap">
        <div className="frame-viewfinder">
          <svg className="viewfinder-ring" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={frame.borderColor}
              strokeWidth="4"
              strokeDasharray="37.7 37.7"
              strokeDashoffset="18.85"
            />
          </svg>
          <QrPreview ref={innerRef} options={options} />
        </div>
        {frame.text && (
          <div className="frame-label-plain" style={{ color: frame.borderColor, fontFamily }}>
            {frame.text}
          </div>
        )}
      </div>
    );
  }

  if (frame.style === 'text-only') {
    return (
      <div className="frame-wrap">
        <QrPreview ref={innerRef} options={options} />
        {frame.text && (
          <div className="frame-label-plain" style={{ color: frame.plainTextColor, fontFamily }}>
            {frame.text}
          </div>
        )}
      </div>
    );
  }

  if (frame.style === 'bottom-bar' || frame.style === 'top-bar') {
    const bar = (
      <div className="frame-bar" style={{ background: frame.fillColor, color: frame.textColor, fontFamily }}>
        {frame.text}
      </div>
    );
    return (
      <div className="frame-bordered" style={{ borderColor: frame.borderColor }}>
        {frame.style === 'top-bar' && bar}
        <QrPreview ref={innerRef} options={options} />
        {frame.style === 'bottom-bar' && bar}
      </div>
    );
  }

  if (frame.style === 'pill') {
    return (
      <div className="frame-wrap">
        <div className="frame-bordered" style={{ borderColor: frame.borderColor }}>
          <QrPreview ref={innerRef} options={options} />
        </div>
        <div className="frame-pill" style={{ background: frame.fillColor, color: frame.textColor, fontFamily }}>
          {frame.text}
        </div>
      </div>
    );
  }

  if (frame.style === 'ribbon-bottom') {
    return (
      <div className="frame-wrap">
        <div className="frame-bordered" style={{ borderColor: frame.borderColor }}>
          <QrPreview ref={innerRef} options={options} />
        </div>
        <div
          className="frame-ribbon"
          style={{ background: frame.fillColor, color: frame.textColor, fontFamily }}
        >
          {frame.text}
        </div>
      </div>
    );
  }

  if (frame.style === 'circle-band') {
    return (
      <div className="frame-wrap">
        <div className="frame-circle" style={{ background: frame.fillColor }}>
          <div className="frame-circle-inner">
            <QrPreview ref={innerRef} options={options} />
          </div>
          <svg className="circle-band-text" viewBox="0 0 200 200">
            <defs>
              <path id="circleBandArc" d="M 30,100 A 70,70 0 1,1 170,100" />
            </defs>
            <text fill={frame.bandTextColor} fontFamily={fontFamily} fontSize="16" fontWeight="700">
              <textPath href="#circleBandArc" startOffset="50%" textAnchor="middle">
                {frame.text}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="frame-wrap">
      <div className="frame-circle" style={{ background: frame.fillColor }}>
        <div className="frame-circle-inner">
          <QrPreview ref={innerRef} options={options} />
        </div>
      </div>
      <div className="frame-pill" style={{ background: frame.fillColor, color: frame.textColor, fontFamily }}>
        {frame.text}
      </div>
    </div>
  );
});

export default FramePreview;
