function BarraNavegacion({
  busqueda,
  setBusqueda,
  volverInicio,
  abrirCarrito,
  cantidadCarrito,
  usuario,
  entrar,
  registrarse,
  salir
}){
  return(
    <header className="barra">
      <button className="marca" onClick={volverInicio}>
        <img src="/imagenes/logo.png" className="logo-imagen" alt="Logo Reacell" />
        <span>Reacell</span>
      </button>

      <div className="zona-buscador">
        <input
          className="buscador"
          value={busqueda}
          onChange={(evento)=>setBusqueda(evento.target.value)}
          placeholder="Buscar celulares..."
        />
      </div>

      <div className="acciones">
        {usuario ? (
          <>
            <span className="usuario">{usuario.correo}</span>
            <button className="boton-secundario" onClick={salir}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button className="boton-secundario" onClick={entrar}>Iniciar sesión</button>
            <button className="boton-secundario" onClick={registrarse}>Registrarse</button>
          </>
        )}

        <button className="boton-carrito" onClick={abrirCarrito}>
          🛒 {cantidadCarrito}
        </button>
      </div>
    </header>
  )
}

export default BarraNavegacion
