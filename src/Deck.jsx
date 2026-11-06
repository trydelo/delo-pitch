import { useCallback, useEffect, useState } from 'react';
import Cover from './slides/Cover.jsx';
import Problem from './slides/Problem.jsx';
import Solution from './slides/Solution.jsx';
import Motives from './slides/Motives.jsx';
import Money from './slides/Money.jsx';
import Product from './slides/Product.jsx';
import Roadmap from './slides/Roadmap.jsx';

const SLIDES = [Cover, Problem, Solution, Motives, Money, Product, Roadmap];
const LAST = SLIDES.length - 1;

function readHash() {
  const n = parseInt(window.location.hash.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), LAST) : 0;
}

function readDemoFlag() {
  return new URLSearchParams(window.location.search).has('demo');
}

function readTheme() {
  const q = new URLSearchParams(window.location.search).get('theme');
  if (q === 'light' || q === 'dark') return q;
  try {
    const saved = localStorage.getItem('delo-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* ignore */
  }
  return 'dark';
}

function usePrintMode() {
  const [print, setPrint] = useState(() => new URLSearchParams(window.location.search).has('print'));
  useEffect(() => {
    const on = () => setPrint(true);
    const off = () => setPrint(new URLSearchParams(window.location.search).has('print'));
    window.addEventListener('beforeprint', on);
    window.addEventListener('afterprint', off);
    return () => {
      window.removeEventListener('beforeprint', on);
      window.removeEventListener('afterprint', off);
    };
  }, []);
  return print;
}

export default function Deck() {
  const [index, setIndex] = useState(() => readHash());
  const [dir, setDir] = useState(1);
  const [demo, setDemo] = useState(() => readDemoFlag());
  const [theme, setTheme] = useState(() => readTheme());
  const print = usePrintMode();

  useEffect(() => {
    try {
      localStorage.setItem('delo-theme', theme);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const go = useCallback((nextIndex) => {
    setIndex((cur) => {
      const n = Math.min(Math.max(nextIndex, 0), LAST);
      if (n !== cur) setDir(n > cur ? 1 : -1);
      return n;
    });
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  }, []);

  const enterDemo = useCallback(() => {
    setDemo(true);
    const url = new URL(window.location.href);
    url.searchParams.set('demo', '1');
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash || `#${index + 1}`}`);
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
  }, [index]);

  const exitDemo = useCallback(() => {
    setDemo(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('demo');
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash || `#${index + 1}`}`);
    if (document.fullscreenElement) document.exitFullscreen?.();
  }, [index]);

  const toggleDemo = useCallback(() => {
    if (demo) exitDemo();
    else enterDemo();
  }, [demo, enterDemo, exitDemo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          go(0);
          break;
        case 'End':
          e.preventDefault();
          go(LAST);
          break;
        case 'f':
        case 'F':
        case 'а':
        case 'А':
          toggleFullscreen();
          break;
        case 'd':
        case 'D':
        case 'в':
        case 'В':
          e.preventDefault();
          toggleDemo();
          break;
        case 't':
        case 'T':
        case 'е':
        case 'Е':
          e.preventDefault();
          toggleTheme();
          break;
        case 'Escape':
          if (demo) {
            e.preventDefault();
            exitDemo();
          }
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, toggleFullscreen, toggleDemo, exitDemo, demo, toggleTheme]);

  useEffect(() => {
    const target = `#${index + 1}`;
    if (window.location.hash !== target) {
      const url = new URL(window.location.href);
      history.replaceState(null, '', `${url.pathname}${url.search}${target}`);
    }
  }, [index]);

  useEffect(() => {
    const onHash = () => go(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [go]);

  const onStageClick = (e) => {
    if (print) return;
    if (e.target.closest('a, button, .controls, .hot')) return;
    next();
  };

  return (
    <div
      className={`viewport${print ? ' is-print' : ''}${demo ? ' is-demo' : ''} dir-${dir > 0 ? 'fwd' : 'back'}`}
      data-slide={index + 1}
      data-theme={theme}
    >
      <div className="demo-badge">Режим демонстрации · Esc выход · D</div>
      <div className="progress" style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }} />
      <button
        type="button"
        className="edge-nav edge-nav-prev"
        aria-label="Предыдущий слайд"
        disabled={index === 0 || print}
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      />
      <button
        type="button"
        className="edge-nav edge-nav-next"
        aria-label="Следующий слайд"
        disabled={index === LAST || print}
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      />
      <div className="stage" onClick={onStageClick}>
        {SLIDES.map((Comp, i) => {
          const active = i === index;
          return (
            <section
              key={i}
              className={`slide${active ? ' is-active' : ''}${i < index ? ' is-past' : ''}${i > index ? ' is-next' : ''}`}
              aria-hidden={!active && !print}
              aria-label={`Слайд ${i + 1} из ${SLIDES.length}`}
            >
              <Comp active={active || print} />
              <div className="slide-num">
                {String(i + 1).padStart(2, '0')}
                <span> / {String(SLIDES.length).padStart(2, '0')}</span>
              </div>
            </section>
          );
        })}
      </div>

      <nav className="controls" aria-label="Навигация">
        <button type="button" onClick={toggleFullscreen} aria-label="Полный экран (F)">
          ⛶
        </button>
        <button
          type="button"
          className={demo ? 'is-on' : undefined}
          onClick={toggleDemo}
          aria-label="Режим демонстрации (D)"
          title="Демо как в PowerPoint (D)"
        >
          ▶
        </button>
        <button
          type="button"
          className={theme === 'light' ? 'is-on' : undefined}
          onClick={toggleTheme}
          aria-label="Светлая / тёмная тема (T)"
          title="Тема (T)"
        >
          {theme === 'light' ? 'Тёмн' : 'Светл'}
        </button>
      </nav>
    </div>
  );
}
