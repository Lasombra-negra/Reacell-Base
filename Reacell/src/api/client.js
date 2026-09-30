import axios from 'axios'
import {pushLog} from './log.js'

const api = axios.create({
  baseURL:'/api',
  timeout:8000,
  headers:{
    'Content-Type':'application/json'
  }
})

api.interceptors.request.use((config)=>{
  config.metadata={startedAt:performance.now()}
  pushLog({
    fase:'request',
    metodo:(config.method || 'get').toUpperCase(),
    url:`${config.baseURL || ''}${config.url || ''}`
  })
  return config
})

api.interceptors.response.use(
  (respuesta)=>{
    const inicio=respuesta.config.metadata?.startedAt
    pushLog({
      fase:'response',
      metodo:(respuesta.config.method || 'get').toUpperCase(),
      url:`${respuesta.config.baseURL || ''}${respuesta.config.url || ''}`,
      estado:respuesta.status,
      ms:inicio ? Math.round(performance.now()-inicio) : undefined
    })
    return respuesta
  },
  (error)=>{
    const config=error.config
    const inicio=config?.metadata?.startedAt
    pushLog({
      fase:'error',
      metodo:(config?.method || 'get').toUpperCase(),
      url:config ? `${config.baseURL || ''}${config.url || ''}` : 'desconocida',
      estado:error.response?.status || 0,
      ms:inicio ? Math.round(performance.now()-inicio) : undefined,
      mensaje:error.response?.data?.message || error.message
    })
    return Promise.reject(error)
  }
)

export default api
