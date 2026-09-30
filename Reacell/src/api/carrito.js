import api from './client.js'

export function obtenerCarrito(){
  return api.get('/carrito')
}

export function anadirAlCarrito(idCelular){
  return api.post('/carrito',{idCelular})
}

export function eliminarDelCarrito(idCelular){
  return api.delete(`/carrito/${idCelular}`)
}

export function vaciarCarrito(){
  return api.delete('/carrito')
}
