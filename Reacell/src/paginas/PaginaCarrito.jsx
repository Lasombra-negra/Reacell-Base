import Carrito from '../componentes/Carrito.jsx'
import BarraNavegacion from '../componentes/BarraNavegacion.jsx'

function PaginaCarrito({
  carrito,
  eliminarProducto,
  vaciar,
  volverInicio,
  abrirPago,
  busqueda,
  setBusqueda,
  abrirCarrito,
  cantidadCarrito,
  usuario,
  entrar,
  registrarse,
  salir
}){
  const total=carrito.reduce((suma,producto)=>suma+producto.precio,0)

  return(
    <div>
      <BarraNavegacion
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        volverInicio={volverInicio}
        abrirCarrito={abrirCarrito}
        cantidadCarrito={cantidadCarrito}
        usuario={usuario}
        entrar={entrar}
        registrarse={registrarse}
        salir={salir}
      />

      <main className="carrito-pagina">
        <button className="boton-volver" onClick={volverInicio}>← Volver</button>
        <div className="encabezado-carrito">
          <div>
            <p className="etiqueta">REACELL</p>
            <h1>Tu carrito</h1>
          </div>
          {carrito.length>0 && <button className="boton-eliminar" onClick={vaciar}>Vaciar carrito</button>}
        </div>

        {carrito.length===0 ? (
          <div className="sin-resultados">
            <h2>Tu carrito está vacío</h2>
            <p>Añade un celular desde el catálogo para comenzar.</p>
            <button className="boton-principal" onClick={volverInicio}>Ver celulares</button>
          </div>
        ) : (
          <>
            <Carrito carrito={carrito} eliminarProducto={eliminarProducto} />
            <div className="resumen-compra">
              <div>
                <span>Total</span>
                <strong>${total.toLocaleString('es-CL')}</strong>
              </div>
              <button className="boton-comprar-final" onClick={abrirPago}>Finalizar compra</button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default PaginaCarrito
