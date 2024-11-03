import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Test } from './test'
import { App } from './app'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <App></App>
    </BrowserRouter>

)
