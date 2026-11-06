import { createRoot } from 'react-dom/client';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import './styles/tokens.css';
import './styles/deck.css';
import './styles/slides.css';
import Deck from './Deck.jsx';

createRoot(document.getElementById('root')).render(<Deck />);
