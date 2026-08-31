import { useRef, useState, useLayoutEffect } from 'react';

export default function ResponsiveScaler({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(null);

  useLayoutEffect(() => {
    function recompute() {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const availableWidth = outer.clientWidth;
      const naturalWidth = inner.scrollWidth;
      const naturalHeight = inner.scrollHeight;
      const nextScale = naturalWidth > availableWidth ? availableWidth / naturalWidth : 1;
      setScale(nextScale);
      setScaledHeight(naturalHeight * nextScale);
    }

    recompute();
    const observer = new ResizeObserver(recompute);
    if (outerRef.current) observer.observe(outerRef.current);
    if (innerRef.current) observer.observe(innerRef.current);
    window.addEventListener('resize', recompute);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recompute);
    };
  });

  return (
    <div ref={outerRef} className="responsive-scaler" style={scaledHeight !== null ? { height: scaledHeight } : undefined}>
      <div ref={innerRef} className="responsive-scaler-inner" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
