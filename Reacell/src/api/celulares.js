import api from './client.js'

export function obtenerCelulares(){
  return api.get('/celulares')
}
