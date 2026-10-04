import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Em produção o HTML vem pré-renderizado (scripts/prerender.mjs) e é hidratado;
// no `npm run dev` a página é montada do zero.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
