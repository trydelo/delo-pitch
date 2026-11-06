import { useEffect, useState } from 'react';

/** Normalized pointer field for the active slide (-0.5…0.5). */
export function usePointerField(active) {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!active) return undefined;
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setP({ x, y });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [active]);
  return p;
}
