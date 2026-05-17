import { hydrateRoot, createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!

const tree = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree)
} else {
  createRoot(rootElement).render(tree)
}
