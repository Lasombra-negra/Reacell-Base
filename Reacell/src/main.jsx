import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './estilos.css'

async function iniciarMSW(){
  if(import.meta.env.VITE_ENABLE_MSW==='false'){
    return
  }

  const {worker}=await import('./mocks/browser.js')

  await worker.start({
    onUnhandledRequest:'bypass',
    serviceWorker:{
      url:'/mockServiceWorker.js'
    }
  })
}

iniciarMSW().then(()=>{
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
