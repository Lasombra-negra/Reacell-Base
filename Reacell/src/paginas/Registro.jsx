import {useState} from 'react'
import {registrarUsuario} from '../api/usuarios.js'
import BarraNavegacion from '../componentes/BarraNavegacion.jsx'

function Registro({
  volver,
  entrar,
  irLogin,
  busqueda,
  setBusqueda,
  abrirCarrito,
  cantidadCarrito,
  usuario,
  salir
}){
  const [correo,setCorreo]=useState('')
  const [contrasena,setContrasena]=useState('')
  const [repetir,setRepetir]=useState('')
  const [error,setError]=useState('')
  const [enviando,setEnviando]=useState(false)

  async function enviar(evento){
    evento.preventDefault()
    setError('')

    if(contrasena!==repetir){
      setError('Las contraseñas no coinciden')
      return
    }

    setEnviando(true)

    try{
      await registrarUsuario({correo,contrasena})
      await entrar()
      volver()
    }catch(errorRespuesta){
      setError(errorRespuesta.response?.data?.message || 'No se pudo registrar')
    }finally{
      setEnviando(false)
    }
  }

  return(
    <div>
      <BarraNavegacion
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        volverInicio={volver}
        abrirCarrito={abrirCarrito}
        cantidadCarrito={cantidadCarrito}
        usuario={usuario}
        entrar={irLogin}
        registrarse={()=>{}}
        salir={salir}
      />

      <main className="pantalla-cuenta">
        <form className="formulario-cuenta" onSubmit={enviar}>
          <p className="etiqueta">REACELL</p>
          <h1>Crear cuenta</h1>
          <p>Registra un correo y una contraseña para utilizar la cuenta simulada.</p>

          {error && <div className="mensaje-error">{error}</div>}

          <label>
            Correo
            <input type="email" value={correo} onChange={(evento)=>setCorreo(evento.target.value)} required />
          </label>

          <label>
            Contraseña
            <input type="password" minLength="4" value={contrasena} onChange={(evento)=>setContrasena(evento.target.value)} required />
          </label>

          <label>
            Repetir contraseña
            <input type="password" minLength="4" value={repetir} onChange={(evento)=>setRepetir(evento.target.value)} required />
          </label>

          <button className="boton-principal" disabled={enviando}>
            {enviando ? 'Registrando...' : 'Registrarse'}
          </button>

          <button type="button" className="boton-secundario ancho" onClick={irLogin}>
            Ya tengo una cuenta
          </button>

          <button type="button" className="boton-link" onClick={volver}>
            ← Volver al inicio
          </button>
        </form>
      </main>
    </div>
  )
}

export default Registro
