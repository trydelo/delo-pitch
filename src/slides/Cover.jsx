import { cover } from '../content.js';

export default function Cover() {
  const cards = [
    { b: cover.team, s: cover.teamNote },
    { b: cover.direction, s: cover.directionNote },
  ];

  return (
    <div className="cover">
      <div className="cover-main">
        <p className="cover-brand enter enter-1">{cover.brand}</p>
        <h1 className="cover-title enter enter-2">{cover.title}</h1>
        <p className="cover-sub enter enter-3">{cover.sub}</p>
        <p className="cover-lead enter enter-4">{cover.lead}</p>
      </div>
      <div className="cover-side enter enter-5">
        <div className="cover-meta">
          {cards.map((c) => (
            <div key={c.b} className="hot" onClick={(e) => e.stopPropagation()}>
              <b>{c.b}</b>
              <span>{c.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
