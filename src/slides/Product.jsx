import { product } from '../content.js';

export default function Product() {
  return (
    <div className="product">
      <div>
        <h2 className="slide-h enter enter-1">{product.title}</h2>
        <p className="slide-lead enter enter-2">{product.lead}</p>
        <div className="product-parts">
          {product.parts.map((p, i) => (
            <div
              key={p.k}
              className={`product-part hot enter enter-${i + 2}`}
              onClick={(e) => e.stopPropagation()}
            >
              <b>{p.k}</b>
              <span>{p.v}</span>
            </div>
          ))}
        </div>
        <div className="product-legal enter enter-5">
          <strong>{product.legalTitle}</strong>
          <div>{product.legal}</div>
          <span className="status">{product.status}</span>
        </div>
        <p className="product-demo enter enter-6">{product.demo}</p>
        <a
          className="product-cta enter enter-7 hot"
          href={product.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {product.cta}
        </a>
      </div>

      <div className="product-stage enter enter-3 hot" onClick={(e) => e.stopPropagation()}>
        <img src={`${import.meta.env.BASE_URL}assets/demo.gif`} alt="Демо: взятие заказа" />
      </div>
    </div>
  );
}
