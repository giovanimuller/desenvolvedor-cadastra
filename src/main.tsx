import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/main.scss';

// Calculate scrollbar width and set it as CSS variable to prevent layout shifts
const calculateScrollbarWidth = (): void => {
  // Create a div with scrollbar
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  
  // Create an inner div
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  // Calculate the width difference
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
  // Remove the divs
  outer.parentNode?.removeChild(outer);
  
  // Set the scrollbar width as a CSS variable
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};

// Run it on load
window.addEventListener('load', calculateScrollbarWidth);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
