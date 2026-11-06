import { skeleton } from '../content.js';

export default function Skeleton({ n }) {
  return (
    <div className="s-skeleton">
      <h2 className="h2 rv" style={{ '--i': 0 }}>
        {skeleton[n].title}
      </h2>
      <p className="s-skeleton__note rv" style={{ '--i': 1 }}>
        Каркас — слайд собирается после согласования стиля
      </p>
    </div>
  );
}
