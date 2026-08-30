function OuterShape({ type }) {
  if (type === 'dot') {
    return <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="4" />;
  }
  if (type === 'extra-rounded') {
    return <rect x="3" y="3" width="26" height="26" rx="10" fill="none" stroke="currentColor" strokeWidth="4" />;
  }
  return <rect x="3" y="3" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="4" />;
}

function InnerShape({ type }) {
  if (type === 'dot') {
    return <circle cx="16" cy="16" r="6" fill="currentColor" />;
  }
  return <rect x="10" y="10" width="12" height="12" fill="currentColor" />;
}

export default function EyeShapeIcon({ cornerSquareType, cornerDotType }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32">
      <OuterShape type={cornerSquareType} />
      <InnerShape type={cornerDotType} />
    </svg>
  );
}
