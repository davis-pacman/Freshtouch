import { useEffect, useState } from "react"
import { getAlertas } from "../services/api"

export default function Topbar() {
  const [hora, setHora] = useState("")
  const [alertas, setAlertas] = useState(0)

  useEffect(() => {
    getAlertas()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        setAlertas(data.length)
      })
      .catch(() => setAlertas(0))
  }, [])

  useEffect(() => {
    getAlertas()
      .then(res => setAlertas(res.data.length))
      .catch(() => { })
  }, [])

  return (
    <div className="topbar">
      <div className="topbar-brand">
        <span className="logo-icon" id="logoIcon" style={alertas > 0 ? { animation: "logoPulse 1s infinite" } : {}}>❄</span>
        <h1>FRESHTOUCH PRO</h1>
      </div>
      <div className="top-right">
        {alertas > 0 && <div className="alert-badge">{alertas}</div>}
        <span className="clock">{hora}</span>
      </div>
    </div>
  )
}