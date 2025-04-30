import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/main.scss';

const calculateScrollbarWidth = (): void => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
  outer.parentNode?.removeChild(outer);
  
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};

window.addEventListener('load', calculateScrollbarWidth);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
