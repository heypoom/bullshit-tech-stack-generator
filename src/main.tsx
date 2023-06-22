import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>
)
