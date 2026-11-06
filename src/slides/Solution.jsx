import { useEffect, useState } from 'react';
import { solution } from '../content.js';

export default function Solution({ active }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    setStep(0);
    const id = setInterval(() => setStep((n) => (n + 1) % solution.steps.length), 3200);
    return () => clearInterval(id);
  }, [active]);

  const progress = ((step + 1) / solution.steps.length) * 100;

  return (
    <div className="solution">
      <header className="solution-head enter enter-1">
        <div className="solution-top">
          <h2 className="slide-h" style={{ margin: 0 }}>
            {solution.title}
          </h2>
          <span className="solution-badge">{solution.badge}</span>
        </div>
        <p className="solution-persona">{solution.persona}</p>
        <p className="solution-note">{solution.personaNote}</p>
      </header>

      <div className="solution-body">
        <div className="solution-col enter enter-3">
          <div className="solution-tracks" aria-hidden>
            <span className="solution-tracks-n" />
            <span>{solution.tracks[0]}</span>
            <span>{solution.tracks[1]}</span>
          </div>
          <div className="solution-list">
            <div className="solution-beam" aria-hidden>
              <i style={{ height: active ? `${progress}%` : 0 }} />
              <span className="solution-beam-dot" style={{ top: `${progress}%` }} />
            </div>
            {solution.steps.map((s, i) => (
              <div
                key={s.n}
                className={`solution-step hot${step === i ? ' is-now' : ''}${i < step ? ' is-done' : ''}`}
                onMouseEnter={() => setStep(i)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="n">{s.n}</div>
                <div className="cell">
                  <small>{s.label}</small>
                  <span>{s.customer}</span>
                </div>
                <div className="cell">
                  <small>{solution.tracks[1]}</small>
                  <span>{s.worker}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="solution-col enter enter-4">
          <div className="solution-tracks solution-tracks-spacer" aria-hidden>
            <span className="solution-tracks-n" />
            <span>&nbsp;</span>
            <span />
          </div>
          <div className="task-card hot" onClick={(e) => e.stopPropagation()}>
            <div className="tag">
              <span>{solution.task.tag}</span>
              <span className="task-status" key={step}>
                {solution.task.statuses[step]}
              </span>
            </div>
            <div className="task-pips" aria-hidden>
              {solution.task.statuses.map((_, i) => (
                <i key={i} className={i <= step ? 'is-on' : undefined} />
              ))}
            </div>
            <h3>{solution.task.title}</h3>
            <p>{solution.task.meta}</p>
            <p>{solution.task.place}</p>
            <div className="mechanic">{solution.mechanic}</div>
            <p className="task-pay">{solution.payNote}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
