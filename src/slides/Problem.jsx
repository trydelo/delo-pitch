import { problem } from '../content.js';

export default function Problem() {
  return (
    <div className="problem">
      <div>
        <h2 className="slide-h enter enter-1">{problem.title}</h2>
      </div>

      <div className="problem-grid">
        <div className="problem-col enter enter-2" onClick={(e) => e.stopPropagation()}>
          <div className="problem-who">{problem.left.who}</div>
          <div className="problem-claim">{problem.left.claim}</div>
          <div className="problem-detail">{problem.left.detail}</div>
        </div>

        <div className="problem-mid enter enter-3" onClick={(e) => e.stopPropagation()}>
          <div className="problem-mid-badge">{problem.center}</div>
        </div>

        <div className="problem-col enter enter-4" onClick={(e) => e.stopPropagation()}>
          <div className="problem-who">{problem.right.who}</div>
          <div className="problem-claim">{problem.right.claim}</div>
          <div className="problem-detail">{problem.right.detail}</div>
        </div>
      </div>

      <p className="problem-stitch enter enter-5">{problem.stitch}</p>
    </div>
  );
}
