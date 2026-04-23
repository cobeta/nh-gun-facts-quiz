import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function setPhoneScale() {
  const scale = Math.min(
    (window.innerWidth - 32) / 390,
    (window.innerHeight - 32) / 844,
    1
  )
  document.documentElement.style.setProperty('--phone-scale', scale)
}

setPhoneScale()
window.addEventListener('resize', setPhoneScale)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
