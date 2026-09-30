function Filtros({
  marca,
  setMarca,
  estado,
  setEstado,
  ram,
  setRam,
  almacenamiento,
  setAlmacenamiento,
  procesador,
  setProcesador,
  minimo,
  setMinimo,
  maximo,
  setMaximo
}){
  function botonFiltro(nombre,valor,actual,setActual){
    return(
      <button
        type="button"
        className={actual===valor ? 'filtro-activo' : ''}
        onClick={()=>setActual(valor)}
      >
        {actual===valor ? `✓ ${nombre}` : nombre}
      </button>
    )
  }

  return(
    <aside className="filtros">
      <div className="titulo-filtro">
        <h2>Filtros</h2>
        <button
          type="button"
          className="limpiar-filtros"
          onClick={()=>{
            setMarca('Todas')
            setEstado('Todos')
            setRam('Todas')
            setAlmacenamiento('Todos')
            setProcesador('Todos')
            setMinimo('')
            setMaximo('')
          }}
        >
          Limpiar
        </button>
      </div>

      <h3>Marca</h3>
      <div className="grupo-filtros">
        {botonFiltro('Todas','Todas',marca,setMarca)}
        {botonFiltro('Samsung','Samsung',marca,setMarca)}
        {botonFiltro('Xiaomi','Xiaomi',marca,setMarca)}
        {botonFiltro('Motorola','Motorola',marca,setMarca)}
        {botonFiltro('Honor','Honor',marca,setMarca)}
      </div>

      <h3>Estado</h3>
      <div className="grupo-filtros">
        {botonFiltro('Todos','Todos',estado,setEstado)}
        {botonFiltro('Nuevo','Nuevo',estado,setEstado)}
        {botonFiltro('Usado sin detalles','Usado sin detalles',estado,setEstado)}
        {botonFiltro('Usado con detalles','Usado con detalles',estado,setEstado)}
      </div>

      <h3>RAM</h3>
      <div className="grupo-filtros">
        {botonFiltro('Todas','Todas',ram,setRam)}
        {botonFiltro('4GB','4GB',ram,setRam)}
        {botonFiltro('6GB','6GB',ram,setRam)}
        {botonFiltro('8GB','8GB',ram,setRam)}
      </div>

      <h3>Almacenamiento</h3>
      <div className="grupo-filtros">
        {botonFiltro('Todos','Todos',almacenamiento,setAlmacenamiento)}
        {botonFiltro('64GB','64GB',almacenamiento,setAlmacenamiento)}
        {botonFiltro('128GB','128GB',almacenamiento,setAlmacenamiento)}
        {botonFiltro('256GB','256GB',almacenamiento,setAlmacenamiento)}
      </div>

      <h3>Procesador</h3>
      <div className="grupo-filtros">
        {botonFiltro('Todos','Todos',procesador,setProcesador)}
        {botonFiltro('Snapdragon','Snapdragon',procesador,setProcesador)}
        {botonFiltro('Helio','Helio',procesador,setProcesador)}
        {botonFiltro('Exynos','Exynos',procesador,setProcesador)}
      </div>

      <h3>Rango de precios</h3>
      <div className="precios">
        <label>
          Mínimo CLP
          <input
            type="number"
            min="0"
            value={minimo}
            onChange={(evento)=>setMinimo(evento.target.value)}
            placeholder="0"
          />
        </label>
        <label>
          Máximo CLP
          <input
            type="number"
            min="0"
            value={maximo}
            onChange={(evento)=>setMaximo(evento.target.value)}
            placeholder="Sin máximo"
          />
        </label>
      </div>
    </aside>
  )
}

export default Filtros
