import {delay,http,HttpResponse} from 'msw'
import {cambiarEstado,leerEstado,obtenerClaveCarrito} from './estado.js'

function respuestaError(mensaje,status=400){
  return HttpResponse.json({message:mensaje},{status})
}

export const handlers=[
  http.get('/api/celulares',async()=>{
    await delay(300)
    const estado=await leerEstado()
    return HttpResponse.json(estado.celulares)
  }),

  http.post('/api/auth/registro',async({request})=>{
    await delay(500)
    const body=await request.json()
    const correo=body.correo?.trim().toLowerCase()
    const contrasena=body.contrasena?.trim()

    if(!correo || !contrasena){
      return respuestaError('El correo y la contraseña son obligatorios')
    }

    if(contrasena.length<4){
      return respuestaError('La contraseña debe tener al menos 4 caracteres')
    }

    const estado=await leerEstado()

    if(estado.usuarios.some((usuario)=>usuario.correo===correo)){
      return respuestaError('Ese correo ya está registrado')
    }

    const usuario={
      id:crypto.randomUUID(),
      correo,
      contrasena
    }

    estado.usuarios.push(usuario)
    estado.sesion={id:usuario.id,correo:usuario.correo}
    await cambiarEstado(()=>estado)

    return HttpResponse.json({
      usuario:{id:usuario.id,correo:usuario.correo}
    },{status:201})
  }),

  http.post('/api/auth/login',async({request})=>{
    await delay(400)
    const body=await request.json()
    const correo=body.correo?.trim().toLowerCase()
    const contrasena=body.contrasena?.trim()
    const estado=await leerEstado()

    const usuario=estado.usuarios.find(
      (item)=>item.correo===correo && item.contrasena===contrasena
    )

    if(!usuario){
      return respuestaError('Correo o contraseña incorrectos',401)
    }

    estado.sesion={id:usuario.id,correo:usuario.correo}
    await cambiarEstado(()=>estado)

    return HttpResponse.json({
      usuario:{id:usuario.id,correo:usuario.correo}
    })
  }),

  http.get('/api/auth/sesion',async()=>{
    await delay(150)
    const estado=await leerEstado()

    if(!estado.sesion){
      return respuestaError('No hay una sesión activa',401)
    }

    return HttpResponse.json(estado.sesion)
  }),

  http.post('/api/auth/logout',async()=>{
    await delay(200)
    const estado=await leerEstado()
    const clave=obtenerClaveCarrito(estado)
    delete estado.carritos[clave]
    estado.sesion=null
    await cambiarEstado(()=>estado)
    return HttpResponse.json({message:'Sesión cerrada'})
  }),

  http.get('/api/carrito',async()=>{
    await delay(200)
    const estado=await leerEstado()
    const clave=obtenerClaveCarrito(estado)
    const ids=estado.carritos[clave] || []
    const productos=ids.map((id)=>estado.celulares.find((celular)=>celular.id===id)).filter(Boolean)
    return HttpResponse.json(productos)
  }),

  http.post('/api/carrito',async({request})=>{
    await delay(250)
    const body=await request.json()
    const idCelular=body.idCelular
    const estado=await leerEstado()
    const celular=estado.celulares.find((item)=>item.id===idCelular)

    if(!celular){
      return respuestaError('Celular no encontrado',404)
    }

    if(celular.stock<=0){
      return respuestaError('Este celular está agotado',409)
    }

    const clave=obtenerClaveCarrito(estado)
    const carrito=estado.carritos[clave] || []
    const cantidad=carrito.filter((id)=>id===idCelular).length

    if(cantidad>=celular.stock){
      return respuestaError('No puedes añadir más unidades que el stock disponible',409)
    }

    carrito.push(idCelular)
    estado.carritos[clave]=carrito
    await cambiarEstado(()=>estado)

    return HttpResponse.json({
      message:'Producto añadido al carrito',
      cantidad:carrito.length
    },{status:201})
  }),

  http.delete('/api/carrito/:id',async({params})=>{
    await delay(200)
    const estado=await leerEstado()
    const clave=obtenerClaveCarrito(estado)
    const carrito=estado.carritos[clave] || []
    const indice=carrito.indexOf(params.id)

    if(indice===-1){
      return respuestaError('El producto no está en el carrito',404)
    }

    carrito.splice(indice,1)
    estado.carritos[clave]=carrito
    await cambiarEstado(()=>estado)

    return HttpResponse.json({message:'Producto eliminado'})
  }),

  http.delete('/api/carrito',async()=>{
    await delay(150)
    const estado=await leerEstado()
    const clave=obtenerClaveCarrito(estado)
    estado.carritos[clave]=[]
    await cambiarEstado(()=>estado)
    return HttpResponse.json({message:'Carrito vaciado'})
  }),

  http.post('/api/pago',async({request})=>{
    await delay(500)
    const body=await request.json()
    const metodo=body.metodo

    if(metodo!=='Debito' && metodo!=='Credito'){
      return respuestaError('Selecciona débito o crédito')
    }

    return HttpResponse.json({
      estado:'redirigiendo',
      entidad:'Webpay',
      mensaje:'Redirigiendo a Webpay para continuar con el pago simulado.'
    })
  }),

  http.post('/api/compras',async({request})=>{
    await delay(700)
    const body=await request.json()
    const estado=await leerEstado()
    const clave=obtenerClaveCarrito(estado)
    const carrito=estado.carritos[clave] || []

    if(carrito.length===0){
      return respuestaError('El carrito está vacío',400)
    }

    const cantidades={}

    carrito.forEach((id)=>{
      cantidades[id]=(cantidades[id] || 0)+1
    })

    for(const id of Object.keys(cantidades)){
      const celular=estado.celulares.find((item)=>item.id===id)
      const cantidad=cantidades[id]

      if(!celular || celular.stock<cantidad){
        return respuestaError(`No hay stock suficiente para ${celular?.nombre || 'un producto'}`,409)
      }
    }

    for(const id of Object.keys(cantidades)){
      const celular=estado.celulares.find((item)=>item.id===id)
      celular.stock-=cantidades[id]
    }

    const total=carrito.reduce((suma,id)=>{
      const celular=estado.celulares.find((item)=>item.id===id)
      return suma+(celular?.precio || 0)
    },0)

    const compra={
      id:crypto.randomUUID(),
      fecha:new Date().toISOString(),
      metodo:body.metodo,
      total,
      productos:[...carrito]
    }

    estado.carritos[clave]=[]
    await cambiarEstado(()=>estado)

    return HttpResponse.json({
      compra,
      celulares:estado.celulares,
      message:'Compra simulada realizada correctamente'
    },{status:201})
  })
]
