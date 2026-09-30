import TarjetaCelular from './TarjetaCelular.jsx'

function ListaCelulares({lista,seleccionar,anadirCarrito}){
  return(
    <div className="lista">
      {lista.map((celular)=>(
        <TarjetaCelular
          key={celular.id}
          celular={celular}
          seleccionar={seleccionar}
          anadirCarrito={anadirCarrito}
        />
      ))}
    </div>
  )
}

export default ListaCelulares
