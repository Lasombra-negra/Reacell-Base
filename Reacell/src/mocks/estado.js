import {celularesIniciales} from './data.js'

const nombreCache='reacell-estado-v1'
const claveEstado='/__reacell_estado__'

const estadoInicial={
  celulares:celularesIniciales,
  usuarios:[],
  sesion:null,
  carritos:{}
}

function copiar(valor){
  return JSON.parse(JSON.stringify(valor))
}

export async function leerEstado(){
  const cache=await caches.open(nombreCache)
  const respuesta=await cache.match(claveEstado)

  if(!respuesta){
    const inicial=copiar(estadoInicial)
    await guardarEstado(inicial)
    return inicial
  }

  return respuesta.json()
}

export async function guardarEstado(estado){
  const cache=await caches.open(nombreCache)
  await cache.put(
    claveEstado,
    new Response(JSON.stringify(estado),{
      headers:{'Content-Type':'application/json'}
    })
  )
}

export async function cambiarEstado(cambiar){
  const estado=await leerEstado()
  const nuevo=cambiar(estado) || estado
  await guardarEstado(nuevo)
  return nuevo
}

export function obtenerClaveCarrito(estado){
  return estado.sesion?.id || 'invitado'
}
