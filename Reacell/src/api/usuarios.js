import api from './client.js'

export function registrarUsuario(datos){
  return api.post('/auth/registro',datos)
}

export function iniciarSesion(datos){
  return api.post('/auth/login',datos)
}

export function obtenerSesion(){
  return api.get('/auth/sesion')
}

export function cerrarSesion(){
  return api.post('/auth/logout')
}
