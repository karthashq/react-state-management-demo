import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// NOTE: StrictMode is intentionally omitted. In dev it double-invokes renders,
// which doubles the render-count numbers and muddies the re-render demo.
createRoot(document.getElementById('root')!).render(<App />)
