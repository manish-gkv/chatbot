import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { nhost } from './lib/nhost'
import { NhostProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <BrowserRouter>
          <App />
          <ToastContainer position="bottom-right" />
        </BrowserRouter>
      </NhostApolloProvider>
    </NhostProvider>
  </StrictMode>,
)
