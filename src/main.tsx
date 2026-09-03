// Ensure window.fetch has both getter and setter to prevent "Cannot set property fetch of #<Window> which has only a getter"
try {
  let _currentFetch = window.fetch;
  const defineWritableFetch = (target: any) => {
    try {
      Object.defineProperty(target, 'fetch', {
        get() {
          return _currentFetch;
        },
        set(newFetch) {
          _currentFetch = newFetch;
        },
        configurable: true,
        enumerable: true,
      });
    } catch {
      // ignore
    }
  };
  defineWritableFetch(window);
  if (typeof Window !== 'undefined' && Window.prototype) {
    defineWritableFetch(Window.prototype);
  }
} catch {
  // ignore
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
