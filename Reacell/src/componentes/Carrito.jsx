function Carrito({carrito,eliminarProducto}){
  const cantidades=carrito.reduce((resultado,producto)=>{
    resultado[producto.id]=(resultado[producto.id] || 0)+1
    return resultado
  },{})

  const productosUnicos=Object.keys(cantidades).map((id)=>carrito.find((producto)=>producto.id===id)).filter(Boolean)

  return(
    <div className="lista-carrito">
      {productosUnicos.map((producto)=>(
        <article className="producto-carrito" key={producto.id}>
          <img src={producto.imagenFrontal} className="foto-carrito" alt={producto.nombre} />

          <div className="datos-carrito">
            <h2>{producto.nombre}</h2>
            <p>Modelo: {producto.modelo}</p>
            <p>Precio unitario: ${producto.precio.toLocaleString('es-CL')}</p>
            <p>Cantidad: {cantidades[producto.id]}</p>
            <strong>Subtotal: ${(producto.precio*cantidades[producto.id]).toLocaleString('es-CL')}</strong>
          </div>

          <button className="boton-eliminar" onClick={()=>eliminarProducto(producto.id)}>
            Eliminar uno
          </button>
        </article>
      ))}
    </div>
  )
}

export default Carrito
