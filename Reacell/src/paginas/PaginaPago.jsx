import {useState} from 'react'
import {confirmarCompra,iniciarPago} from '../api/compras.js'
import BarraNavegacion from '../componentes/BarraNavegacion.jsx'

function PaginaPago({
  carrito,
  volverCarrito,
  compraRealizada,
  busqueda,
  setBusqueda,
  abrirCarrito,
  cantidadCarrito,
  usuario,
  entrar,
  registrarse,
  salir
}){
  const [metodo,setMetodo]=useState('')
  const [estado,setEstado]=useState('seleccion')
  const [mensaje,setMensaje]=useState('')
  const total=carrito.reduce((suma,producto)=>suma+producto.precio,0)

  async function continuar(){
    if(!metodo){
      setMensaje('Selecciona débito o crédito')
      return
    }

    if(!usuario){
      setMensaje('Debes iniciar sesión o registrarte antes de confirmar la compra')
      return
    }

    setEstado('redireccion')
    setMensaje('')

    try{
      const respuesta=await iniciarPago({metodo})
      setMensaje(respuesta.data.mensaje)
      setTimeout(()=>setEstado('webpay'),900)
    }catch(error){
      setEstado('seleccion')
      setMensaje(error.response?.data?.message || 'No se pudo iniciar el pago')
    }
  }

  async function confirmar(){
    setEstado('procesando')
    setMensaje('Procesando pago simulado...')

    try{
      const respuesta=await confirmarCompra({metodo})
      setTimeout(()=>compraRealizada(respuesta.data),700)
    }catch(error){
      setEstado('seleccion')
      setMensaje(error.response?.data?.message || 'No se pudo completar la compra')
    }
  }

  return(
    <div>
      <BarraNavegacion
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        volverInicio={volverCarrito}
        abrirCarrito={abrirCarrito}
        cantidadCarrito={cantidadCarrito}
        usuario={usuario}
        entrar={entrar}
        registrarse={registrarse}
        salir={salir}
      />

      <main className="pago-pagina">
        <button className="boton-volver" onClick={volverCarrito}>← Volver al carrito</button>

        {estado==='seleccion' && (
          <section className="pago-card">
            <p className="etiqueta">PAGO SIMULADO</p>
            <h1>Forma de pago</h1>
            <p>Total de la compra: <strong>${total.toLocaleString('es-CL')}</strong></p>

            {!usuario && <div className="mensaje-info">Para confirmar la compra debes iniciar sesión.</div>}
            {mensaje && <div className="mensaje-error">{mensaje}</div>}

            <div className="metodos-pago">
              <button
                className={metodo==='Debito' ? 'metodo-activo' : ''}
                onClick={()=>setMetodo('Debito')}
              >
                <strong>Débito</strong>
                <span>Pago con tarjeta de débito</span>
              </button>
              <button
                className={metodo==='Credito' ? 'metodo-activo' : ''}
                onClick={()=>setMetodo('Credito')}
              >
                <strong>Crédito</strong>
                <span>Pago con tarjeta de crédito</span>
              </button>
            </div>

            <button className="boton-comprar-final" onClick={continuar}>Continuar</button>
          </section>
        )}

        {estado==='redireccion' && (
          <section className="pago-card centrado">
            <div className="spinner"></div>
            <h1>Redirigiendo a Webpay</h1>
            <p>{mensaje}</p>
          </section>
        )}

        {estado==='webpay' && (
          <section className="pago-card webpay-simulacion">
            <div className="webpay-logo">WEBPAY</div>
            <p>SIMULACIÓN DE ENTIDAD DE PAGO</p>
            <h1>Confirmar pago</h1>
            <p>Monto: <strong>${total.toLocaleString('es-CL')}</strong></p>
            <p>Medio seleccionado: <strong>{metodo==='Debito' ? 'Débito' : 'Crédito'}</strong></p>
            <div className="mensaje-info">No se ingresan datos bancarios reales. Esta pantalla es parte de la simulación.</div>
            <button className="boton-comprar-final" onClick={confirmar}>Confirmar pago simulado</button>
          </section>
        )}

        {estado==='procesando' && (
          <section className="pago-card centrado">
            <div className="spinner"></div>
            <h1>Procesando compra</h1>
            <p>{mensaje}</p>
          </section>
        )}
      </main>
    </div>
  )
}

export default PaginaPago
