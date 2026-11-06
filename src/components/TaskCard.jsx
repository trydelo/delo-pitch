export default function TaskCard({ task, size = 'lg', status, note, className = '', style }) {
  return (
    <article className={`task-card task-card--${size} ${className}`} style={style}>
      <header className="task-card__top">
        <span className="task-card__label">{task.label}</span>
        {status ? (
          <span className="task-card__status" key={status}>
            {status}
          </span>
        ) : (
          <span className="task-card__who">{task.customer}</span>
        )}
      </header>
      <h3 className="task-card__title">{task.title}</h3>
      <p className="task-card__when">{status ? `${task.customer} · ${task.when}` : task.when}</p>
      <div className="task-card__bottom">
        <span className="task-card__k">Бюджет</span>
        <span className="task-card__budget">{task.budget}</span>
      </div>
      {note && <p className="task-card__note">{note}</p>}
    </article>
  );
}
