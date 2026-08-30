function classyPath(radius) {
  const start = 4 + radius;
  const end = 28 - radius;
  return `M${start},4 L28,4 L28,${end} Q28,28 ${end},28 L4,28 L4,${start} Q4,4 ${start},4 Z`;
}

export default function DotShapeIcon({ type }) {
  switch (type) {
    case 'square':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <rect x="4" y="4" width="24" height="24" fill="currentColor" />
        </svg>
      );
    case 'rounded':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" />
        </svg>
      );
    case 'dots':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="9" fill="currentColor" />
        </svg>
      );
    case 'extra-rounded':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <rect x="3" y="10" width="26" height="12" rx="6" fill="currentColor" />
        </svg>
      );
    case 'classy':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <path d={classyPath(8)} fill="currentColor" />
        </svg>
      );
    case 'classy-rounded':
      return (
        <svg width="28" height="28" viewBox="0 0 32 32">
          <path d={classyPath(13)} fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
