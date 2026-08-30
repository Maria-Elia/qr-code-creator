function QrPlaceholder({ x = 10, y = 10, size = 12 }) {
  return <rect x={x} y={y} width={size} height={size} rx="2" fill="currentColor" />;
}

function BorderRect() {
  return <rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />;
}

export default function FrameShapeIcon({ style }) {
  switch (style) {
    case 'none':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <QrPlaceholder />
        </svg>
      );
    case 'border':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <BorderRect />
          <QrPlaceholder />
        </svg>
      );
    case 'corner-marks':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <path d="M4 10 V4 H10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M22 4 H28 V10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M4 22 V28 H10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M28 22 V28 H22" fill="none" stroke="currentColor" strokeWidth="2" />
          <QrPlaceholder />
        </svg>
      );
    case 'circle-viewfinder':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          <QrPlaceholder />
        </svg>
      );
    case 'text-only':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <QrPlaceholder y="7" />
          <rect x="9" y="25" width="14" height="2.5" rx="1.25" fill="currentColor" />
        </svg>
      );
    case 'bottom-bar':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <BorderRect />
          <rect x="4" y="22" width="24" height="6" fill="currentColor" />
          <QrPlaceholder y="7" />
        </svg>
      );
    case 'top-bar':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <BorderRect />
          <rect x="4" y="4" width="24" height="6" fill="currentColor" />
          <QrPlaceholder y="12" />
        </svg>
      );
    case 'pill':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <BorderRect />
          <QrPlaceholder y="7" />
          <rect x="9" y="25" width="14" height="6" rx="3" fill="currentColor" />
        </svg>
      );
    case 'ribbon-bottom':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <BorderRect />
          <QrPlaceholder y="7" />
          <path d="M6,25 L10,22 L22,22 L26,25 L22,28 L10,28 Z" fill="currentColor" />
        </svg>
      );
    case 'circle-badge':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <circle cx="16" cy="13" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <QrPlaceholder x="11" y="8" size="10" />
          <rect x="10" y="25" width="12" height="5" rx="2.5" fill="currentColor" />
        </svg>
      );
    case 'circle-band':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M6,10 A12,12 0 0,1 26,10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
          <QrPlaceholder x="11" y="11" size="10" />
        </svg>
      );
    default:
      return null;
  }
}
