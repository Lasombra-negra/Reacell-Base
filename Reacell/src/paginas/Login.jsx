import {useState} from 'react'
import {iniciarSesion} from '../api/usuarios.js'
import BarraNavegacion from '../componentes/BarraNavegacion.jsx'

function Login({
  volver,
  entrar,
  irRegistro,
  busqueda,
  setBusqueda,
  abrirCarrito,
  cantidadCarrito,
  usuario,
  salir
}){
  const [correo,setCorreo]=useState('')
  const [contrasena,setContrasena]=useState('')
  const [error,setError]=useState('')
  const [enviando,setEnviando]=useState(false)

  async function enviar(evento){
    evento.preventDefault()
    setError('')
    setEnviando(true)

    try{
      await iniciarSesion({correo,contrasena})
      await entrar()
      volver()
    }catch(errorRespuesta){
      setError(errorRespuesta.response?.data?.message || 'No se pudo iniciar sesión')
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
        entrar={()=>{} }
        registrarse={irRegistro}
        salir={salir}
      />

      <main className="pantalla-cuenta">
        <form className="formulario-cuenta" onSubmit={enviar}>
          <p className="etiqueta">REACELL</p>
          <h1>Iniciar sesión</h1>
          <p>Ingresa a tu cuenta para mantener tu sesión al recargar la página.</p>

          {error && <div className="mensaje-error">{error}</div>}

          <label>
            Correo
            <input type="email" value={correo} onChange={(evento)=>setCorreo(evento.target.value)} required />
          </label>

          <label>
            Contraseña
            <input type="password" value={contrasena} onChange={(evento)=>setContrasena(evento.target.value)} required />
          </label>

          <button className="boton-principal" disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <button type="button" className="boton-secundario ancho" onClick={irRegistro}>
            Crear una cuenta
          </button>

          <button type="button" className="boton-link" onClick={volver}>
            ← Volver al inicio
          </button>
        </form>
      </main>
    </div>
  )
}

export default Login
