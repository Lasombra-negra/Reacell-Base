import {useState} from 'react'
import BarraNavegacion from '../componentes/BarraNavegacion.jsx'

function DetalleCelular({
  celular,
  celulares,
  seleccionar,
  volverInicio,
  anadirCarrito,
  busqueda,
  setBusqueda,
  abrirCarrito,
  cantidadCarrito,
  usuario,
  entrar,
  registrarse,
  salir
}){
  const [mostrarComponentes,setMostrarComponentes]=useState(false)
  const [mostrarDetalles,setMostrarDetalles]=useState(false)
  const indice=celulares.findIndex((item)=>item.id===celular.id)
  const anterior=indice>0 ? celulares[indice-1] : null
  const siguiente=indice<celulares.length-1 ? celulares[indice+1] : null

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

      <div className="detalle-contenedor">
        <button className="boton-volver" onClick={volverInicio}>← Atrás</button>

        <div className="detalle-producto">
          <div className="galeria-detalle">
            <img src={celular.imagenFrontal} className="foto-detalle" alt={`${celular.nombre} frontal`} />
            <img src={celular.imagenTrasera} className="foto-detalle" alt={`${celular.nombre} trasera`} />
          </div>

          <div className="informacion-producto">
            <div className="titulo-compra">
              <div>
                <p className="etiqueta">PRODUCTO</p>
                <h1>{celular.nombre}</h1>
                <h2 className="precio-detalle">${celular.precio.toLocaleString('es-CL')}</h2>
              </div>
              <button
                className="boton-anadir grande"
                disabled={celular.stock<=0}
                onClick={()=>anadirCarrito(celular)}
              >
                {celular.stock<=0 ? 'Agotado' : 'Añadir al carrito'}
              </button>
            </div>

            <div className="datos-detalle">
              <p><strong>Modelo:</strong> {celular.modelo}</p>
              <p><strong>Estado:</strong> {celular.estado}</p>
              <p><strong>RAM:</strong> {celular.ram}</p>
              <p><strong>Almacenamiento:</strong> {celular.almacenamiento}</p>
              <p><strong>Procesador:</strong> {celular.procesador}</p>
              <p><strong>Pantalla:</strong> {celular.pantalla}</p>
              <p><strong>Cámara:</strong> {celular.camara}</p>
              <p><strong>Batería:</strong> {celular.bateria}</p>
              <p><strong>Carga:</strong> {celular.carga}</p>
            </div>

            <button className="desplegable" onClick={()=>setMostrarComponentes(!mostrarComponentes)}>
              {mostrarComponentes ? '▲' : '▼'} Componentes del celular
            </button>
            {mostrarComponentes && (
              <ul className="lista-detalles">
                {celular.componentes.map((item)=> <li key={item}>✓ {item}</li>)}
              </ul>
            )}

            <button className="desplegable" onClick={()=>setMostrarDetalles(!mostrarDetalles)}>
              {mostrarDetalles ? '▲' : '▼'} Detalles del reacondicionado
            </button>
            {mostrarDetalles && (
              <ul className="lista-detalles">
                {celular.detalles.map((item)=> <li key={item}>✓ {item}</li>)}
              </ul>
            )}
          </div>
        </div>

        <div className="navegacion-productos">
          <button
            className="boton-navegacion"
            disabled={!anterior}
            onClick={()=>anterior && seleccionar(anterior)}
          >
            ← Anterior
          </button>
          <button
            className="boton-navegacion"
            disabled={!siguiente}
            onClick={()=>siguiente && seleccionar(siguiente)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleCelular
