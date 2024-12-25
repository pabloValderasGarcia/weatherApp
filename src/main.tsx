import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import QueryProvider from './lib/query.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
)