import { money } from '../content.js';

export default function Money() {
  return (
    <div className="money">
      <div>
        <span className="money-badge enter enter-1">{money.badge}</span>
        <h2 className="slide-h enter enter-2">{money.title}</h2>
      </div>

      <div className="money-hero">
        <div className="money-main enter enter-3 hot" onClick={(e) => e.stopPropagation()}>
          <div className="type">{money.type}</div>
          <div className="value">{money.value}</div>
          <div className="how">{money.how}</div>
          <div className="how-extra">{money.howExtra}</div>
        </div>
        <div className="money-side">
          <div className="hot enter enter-4" onClick={(e) => e.stopPropagation()}>
            <b>{money.payer}</b>
            <span>{money.payerNote}</span>
          </div>
          <div className="hot enter enter-5" onClick={(e) => e.stopPropagation()}>
            <b>{money.noCustomer}</b>
            <span>{money.noCustomerNote}</span>
          </div>
          <div className="hot enter enter-6" onClick={(e) => e.stopPropagation()}>
            <b>{money.noSub}</b>
            <span>{money.noSubNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
