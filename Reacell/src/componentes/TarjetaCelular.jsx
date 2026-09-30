function TarjetaCelular({celular,seleccionar,anadirCarrito}){
  const agotado=celular.stock<=0

  return(
    <article className={`tarjeta ${agotado ? 'tarjeta-agotada' : ''}`}>
      <div className="galeria-card">
        <img src={celular.imagenFrontal} className="foto-celular" alt={`${celular.nombre} frontal`} />
        <img src={celular.imagenTrasera} className="foto-celular" alt={`${celular.nombre} trasera`} />
      </div>

      <div className="informacion-card">
        <h2>{celular.nombre}</h2>
        <p><strong>Modelo:</strong> {celular.modelo}</p>
        <p><strong>Estado:</strong> {celular.estado}</p>
        <p><strong>RAM:</strong> {celular.ram}</p>
        <p><strong>Almacenamiento:</strong> {celular.almacenamiento}</p>
      </div>

      <div className="parte-inferior-card">
        <strong className="precio">${celular.precio.toLocaleString('es-CL')}</strong>
        <span className={`stock ${agotado ? 'stock-agotado' : ''}`}>
          {agotado ? 'Agotado' : `Stock: ${celular.stock}`}
        </span>
      </div>

      <div className="botones-card">
        <button className="boton-detalle" onClick={()=>seleccionar(celular)}>
          Detalles
        </button>
        <button
          className="boton-anadir"
          disabled={agotado}
          onClick={()=>anadirCarrito(celular)}
        >
          {agotado ? 'Agotado' : 'Añadir al carrito'}
        </button>
      </div>
    </article>
  )
}

export default TarjetaCelular
