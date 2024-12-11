import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
// import './combined-v5.css';
// import './combined-v4.css';
// import './combined-v3.css'
// import './combined-v2.css'
// import './combined.css'
// import './index.css'
// import './markdown.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
