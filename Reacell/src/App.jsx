import {useEffect,useState} from 'react'
import {obtenerCelulares} from './api/celulares.js'
import {obtenerCarrito,anadirAlCarrito,eliminarDelCarrito,vaciarCarrito} from './api/carrito.js'
import {obtenerSesion,cerrarSesion} from './api/usuarios.js'
import Inicio from './paginas/Inicio.jsx'
import DetalleCelular from './paginas/DetalleCelular.jsx'
import PaginaCarrito from './paginas/PaginaCarrito.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import PaginaPago from './paginas/PaginaPago.jsx'

function App(){
  const [pagina,setPagina]=useState('inicio')
  const [celulares,setCelulares]=useState([])
  const [celularSeleccionado,setCelularSeleccionado]=useState(null)
  const [carrito,setCarrito]=useState([])
  const [usuario,setUsuario]=useState(null)
  const [busqueda,setBusqueda]=useState('')
  const [cargando,setCargando]=useState(true)
  const [mensaje,setMensaje]=useState('')

  async function cargarDatos(){
    setCargando(true)
    try{
      const [respuestaCelulares,respuestaCarrito,respuestaSesion]=await Promise.allSettled([
        obtenerCelulares(),
        obtenerCarrito(),
        obtenerSesion()
      ])

      if(respuestaCelulares.status==='fulfilled'){
        setCelulares(respuestaCelulares.value.data)
      }

      if(respuestaCarrito.status==='fulfilled'){
        setCarrito(respuestaCarrito.value.data)
      }

      if(respuestaSesion.status==='fulfilled'){
        setUsuario(respuestaSesion.value.data)
      }
    }finally{
      setCargando(false)
    }
  }

  useEffect(()=>{
    cargarDatos()
  },[])

  function irInicio(){
    setPagina('inicio')
    setCelularSeleccionado(null)
    setMensaje('')
  }

  function abrirDetalle(celular){
    setCelularSeleccionado(celular)
    setPagina('detalle')
    setMensaje('')
  }

  function abrirCarrito(){
    setPagina('carrito')
    setMensaje('')
  }

  async function anadirProducto(celular){
    try{
      const respuesta=await anadirAlCarrito(celular.id)
      const carritoActual=await obtenerCarrito()
      setCarrito(carritoActual.data)
      setMensaje(respuesta.data.message)
    }catch(error){
      setMensaje(error.response?.data?.message || 'No se pudo añadir el producto')
    }
  }

  async function eliminarProducto(idCelular){
    try{
      await eliminarDelCarrito(idCelular)
      const respuesta=await obtenerCarrito()
      setCarrito(respuesta.data)
    }catch(error){
      setMensaje(error.response?.data?.message || 'No se pudo eliminar el producto')
    }
  }

  async function vaciar(){
    await vaciarCarrito()
    setCarrito([])
  }

  async function actualizarSesion(){
    try{
      const respuesta=await obtenerSesion()
      setUsuario(respuesta.data)
      const respuestaCarrito=await obtenerCarrito()
      setCarrito(respuestaCarrito.data)
    }catch{
      setUsuario(null)
      setCarrito([])
    }
  }

  async function salir(){
    await cerrarSesion()
    setUsuario(null)
    setCarrito([])
    irInicio()
  }

  function entrar(){
    setPagina('login')
    setMensaje('')
  }

  function registrarse(){
    setPagina('registro')
    setMensaje('')
  }

  function volverDesdeCuenta(){
    irInicio()
  }

  function abrirPago(){
    if(carrito.length===0){
      setMensaje('El carrito está vacío')
      return
    }
    setPagina('pago')
    setMensaje('')
  }

  async function compraRealizada(respuesta){
    setCelulares(respuesta.celulares)
    setCarrito([])
    setMensaje(respuesta.message)
    setPagina('inicio')
    setCelularSeleccionado(null)
  }

  if(cargando){
    return(
      <div className="pantalla-carga">
        <h1>Reacell</h1>
        <p>Conectando con la API simulada...</p>
      </div>
    )
  }

  return(
    <>
      {pagina==='inicio' && (
        <Inicio
          celulares={celulares}
          seleccionar={abrirDetalle}
          anadirCarrito={anadirProducto}
          abrirCarrito={abrirCarrito}
          cantidadCarrito={carrito.length}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          volverInicio={irInicio}
          usuario={usuario}
          entrar={entrar}
          registrarse={registrarse}
          salir={salir}
          mensaje={mensaje}
        />
      )}

      {pagina==='detalle' && celularSeleccionado && (
        <DetalleCelular
          celular={celularSeleccionado}
          celulares={celulares}
          seleccionar={abrirDetalle}
          volverInicio={irInicio}
          anadirCarrito={anadirProducto}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          abrirCarrito={abrirCarrito}
          cantidadCarrito={carrito.length}
          usuario={usuario}
          entrar={entrar}
          registrarse={registrarse}
          salir={salir}
        />
      )}

      {pagina==='carrito' && (
        <PaginaCarrito
          carrito={carrito}
          eliminarProducto={eliminarProducto}
          vaciar={vaciar}
          volverInicio={irInicio}
          abrirPago={abrirPago}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          abrirCarrito={abrirCarrito}
          cantidadCarrito={carrito.length}
          usuario={usuario}
          entrar={entrar}
          registrarse={registrarse}
          salir={salir}
        />
      )}

      {pagina==='login' && (
        <Login
          volver={volverDesdeCuenta}
          entrar={actualizarSesion}
          irRegistro={registrarse}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          abrirCarrito={abrirCarrito}
          cantidadCarrito={carrito.length}
          usuario={usuario}
          salir={salir}
        />
      )}

      {pagina==='registro' && (
        <Registro
          volver={volverDesdeCuenta}
          entrar={actualizarSesion}
          irLogin={entrar}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          abrirCarrito={abrirCarrito}
          cantidadCarrito={carrito.length}
          usuario={usuario}
          salir={salir}
        />
      )}

      {pagina==='pago' && (
        <PaginaPago
          carrito={carrito}
          volverCarrito={()=>setPagina('carrito')}
          compraRealizada={compraRealizada}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          abrirCarrito={abrirCarrito}
          cantidadCarrito={carrito.length}
          usuario={usuario}
          entrar={entrar}
          registrarse={registrarse}
          salir={salir}
        />
      )}
    </>
  )
}

export default App
