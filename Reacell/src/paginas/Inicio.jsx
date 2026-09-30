import {useMemo,useState} from 'react'
import BarraNavegacion from '../componentes/BarraNavegacion.jsx'
import Filtros from '../componentes/Filtros.jsx'
import ListaCelulares from '../componentes/ListaCelulares.jsx'

function Inicio({
  celulares,
  seleccionar,
  anadirCarrito,
  abrirCarrito,
  cantidadCarrito,
  busqueda,
  setBusqueda,
  volverInicio,
  usuario,
  entrar,
  registrarse,
  salir,
  mensaje
}){
  const [marca,setMarca]=useState('Todas')
  const [estado,setEstado]=useState('Todos')
  const [ram,setRam]=useState('Todas')
  const [almacenamiento,setAlmacenamiento]=useState('Todos')
  const [procesador,setProcesador]=useState('Todos')
  const [minimo,setMinimo]=useState('')
  const [maximo,setMaximo]=useState('')

  const celularesFiltrados=useMemo(()=>{
    const texto=busqueda.trim().toLowerCase()
    const minimoNumero=minimo==='' ? 0 : Number(minimo)
    const maximoNumero=maximo==='' ? Infinity : Number(maximo)

    const filtrados=celulares.filter((celular)=>{
      const coincideBusqueda=
        !texto ||
        celular.nombre.toLowerCase().includes(texto) ||
        celular.modelo.toLowerCase().includes(texto) ||
        celular.marca.toLowerCase().includes(texto)

      const coincideMarca=marca==='Todas' || celular.marca===marca
      const coincideEstado=estado==='Todos' || celular.estado===estado
      const coincideRam=ram==='Todas' || celular.ram===ram
      const coincideAlmacenamiento=almacenamiento==='Todos' || celular.almacenamiento===almacenamiento
      const coincideProcesador=procesador==='Todos' || celular.procesador.includes(procesador)
      const coincidePrecio=celular.precio>=minimoNumero && celular.precio<=maximoNumero

      return coincideBusqueda && coincideMarca && coincideEstado && coincideRam && coincideAlmacenamiento && coincideProcesador && coincidePrecio
    })

    return [...filtrados].sort((a,b)=>Number(a.stock<=0)-Number(b.stock<=0))
  },[celulares,busqueda,marca,estado,ram,almacenamiento,procesador,minimo,maximo])

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

      <section className="portada">
        <div>
          <p className="etiqueta">CELULARES REACONDICIONADOS</p>
          <h1>Tecnología que vuelve a funcionar.</h1>
          <p>Equipos revisados, información clara y compra simulada mediante una API con MSW.</p>
        </div>
      </section>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      <div className="contenido">
        <Filtros
          marca={marca}
          setMarca={setMarca}
          estado={estado}
          setEstado={setEstado}
          ram={ram}
          setRam={setRam}
          almacenamiento={almacenamiento}
          setAlmacenamiento={setAlmacenamiento}
          procesador={procesador}
          setProcesador={setProcesador}
          minimo={minimo}
          setMinimo={setMinimo}
          maximo={maximo}
          setMaximo={setMaximo}
        />

        <main className="zona-productos">
          <div className="encabezado-lista">
            <div>
              <p className="etiqueta">CATÁLOGO</p>
              <h2>Celulares disponibles</h2>
            </div>
            <span>{celularesFiltrados.filter((celular)=>celular.stock>0).length} disponibles</span>
          </div>

          {celularesFiltrados.length===0 ? (
            <div className="sin-resultados">
              <h2>No encontramos celulares</h2>
              <p>Prueba cambiando los filtros o el rango de precios.</p>
            </div>
          ) : (
            <ListaCelulares
              lista={celularesFiltrados}
              seleccionar={seleccionar}
              anadirCarrito={anadirCarrito}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default Inicio
