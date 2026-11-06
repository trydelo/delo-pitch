import { roadmap } from '../content.js';

export default function Roadmap() {
  return (
    <div className="roadmap">
      <div>
        <h2 className="slide-h enter enter-1">{roadmap.title}</h2>
        <p className="slide-lead enter enter-2">{roadmap.note}</p>
        <table className="roadmap-table enter enter-3">
          <thead>
            <tr>
              <th>Период</th>
              <th>Этап</th>
              <th>Проверка</th>
            </tr>
          </thead>
          <tbody>
            {roadmap.rows.map((r) => (
              <tr key={r.when} className="hot" onClick={(e) => e.stopPropagation()}>
                <td className="when">{r.when}</td>
                <td>{r.what}</td>
                <td>{r.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className="roadmap-aside enter enter-4">
        <img src={`${import.meta.env.BASE_URL}assets/qr.png`} alt="" />
        <p>{roadmap.qrLabel}</p>
      </aside>
    </div>
  );
}
