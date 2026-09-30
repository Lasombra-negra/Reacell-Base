import api from './client.js'

export function iniciarPago(datos){
  return api.post('/pago',datos)
}

export function confirmarCompra(datos){
  return api.post('/compras',datos)
}
