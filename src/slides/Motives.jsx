import { useEffect, useMemo, useState } from 'react';
import { motives } from '../content.js';

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx, cy, r, start, end) {
  const s = polar(cx, cy, r, end);
  const e = polar(cx, cy, r, start);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y}`;
}

export default function Motives({ active }) {
  const [focus, setFocus] = useState(0);
  const total = motives.bars.reduce((s, b) => s + b.pct, 0);

  const slices = useMemo(() => {
    let angle = 0;
    return motives.bars.map((b, i) => {
      const sweep = (b.pct / total) * 360;
      const start = angle;
      const end = angle + sweep;
      angle = end;
      return { ...b, i, start, end };
    });
  }, [total]);

  useEffect(() => {
    if (!active) return undefined;
    setFocus(0);
    const id = setInterval(() => setFocus((n) => (n + 1) % slices.length), 4200);
    return () => clearInterval(id);
  }, [active, slices.length]);

  const cur = slices[focus] || slices[0];
  const cx = 120;
  const cy = 120;
  const r = 88;

  return (
    <div className="motives">
      <div>
        <h2 className="slide-h enter enter-1">{motives.title}</h2>
        <p className="slide-lead enter enter-2">{motives.chartLabel}</p>
      </div>

      <div className="motives-grid">
        <div className="motives-chart enter enter-3 hot" onClick={(e) => e.stopPropagation()}>
          <svg viewBox="0 0 240 240" className="motives-donut" role="img" aria-label={motives.chartLabel}>
            <circle cx={cx} cy={cy} r={r} className="motives-donut-track" />
            {slices.map((s) => {
              const on = focus === s.i;
              const rr = active ? (on ? r + 6 : r) : r * 0.15;
              return (
                <path
                  key={s.label}
                  d={arcPath(cx, cy, rr, s.start, s.end - 0.6)}
                  className={`motives-slice${on ? ' is-on' : ''}`}
                  style={{ stroke: COLORS[s.i] }}
                  onMouseEnter={() => setFocus(s.i)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocus(s.i);
                  }}
                />
              );
            })}
            <circle cx={cx} cy={cy} r={54} className="motives-donut-hole" />
            <text x={cx} y={cy - 6} textAnchor="middle" className="motives-center-pct">
              {cur.pct}%
            </text>
            <text x={cx} y={cy + 18} textAnchor="middle" className="motives-center-label">
              {cur.label.length > 16 ? `${cur.label.slice(0, 14)}…` : cur.label}
            </text>
          </svg>

          <div className="motives-legend">
            {slices.map((s) => (
              <button
                key={s.label}
                type="button"
                className={`motives-legend-item hot${focus === s.i ? ' is-on' : ''}`}
                onMouseEnter={() => setFocus(s.i)}
                onClick={(e) => {
                  e.stopPropagation();
                  setFocus(s.i);
                }}
              >
                <i style={{ background: COLORS[s.i] }} />
                <span>{s.label}</span>
                <b>{s.pct}%</b>
              </button>
            ))}
          </div>
        </div>

        <div className="motives-aside enter enter-5">
          <p>{motives.takeaway}</p>
          <p>{motives.takeawayExtra}</p>
          <div className="frame">{motives.frame}</div>
          <p className="motives-source">
            Источник:{' '}
            <a href={motives.sourceUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              {motives.source}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
