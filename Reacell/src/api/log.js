const claveLogs = 'reacell_logs'

export function obtenerLogs(){
  try{
    return JSON.parse(localStorage.getItem(claveLogs)) || []
  }catch{
    return []
  }
}

export function pushLog(log){
  const actuales = obtenerLogs()
  actuales.unshift({
    ...log,
    fecha:new Date().toLocaleTimeString('es-CL')
  })
  localStorage.setItem(claveLogs,JSON.stringify(actuales.slice(0,30)))
}
