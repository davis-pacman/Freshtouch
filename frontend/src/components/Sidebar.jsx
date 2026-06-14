import { useState, useEffect } from "react"
import { getAlertas } from "../services/api"

export default function Sidebar({ simDate, onDateChange }) {
  const [calView, setCalView] = useState(new Date())
  const [alertas, setAlertas] = useState([])

  const MS_DIA = 24 * 60 * 60 * 1000

  function calcularDiasRestantes(item) {
    // Si existe fechaVence, calcular diferencia relativa a simDate (o hoy si no hay)
    const base = simDate ? new Date(simDate) : new Date()
    base.setHours(0, 0, 0, 0)

    if (item && item.fechaVence) {
      // garantizar que se parsea como fecha local a medianoche
      const fv = new Date(item.fechaVence + 'T00:00:00')
      fv.setHours(0, 0, 0, 0)
      const diff = Math.round((fv.getTime() - base.getTime()) / MS_DIA)
      return Math.max(0, diff)
    }

    // Fallback: si sólo hay diasVida proporcionado por el backend (relativo a hoy)
    if (item && typeof item.diasVida === 'number') {
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0)
      const diff = Math.round((base.getTime() - hoy.getTime()) / MS_DIA)
      return Math.max(0, item.diasVida - diff)
    }

    return 0
  }

  const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
  const DIAS = ["D", "L", "M", "X", "J", "V", "S"]

  useEffect(() => {
    getAlertas()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        setAlertas(data)
      })
      .catch(() => setAlertas([]))
  }, [simDate])

  // Mantener la vista del calendario en sincronía con la fecha simulada
  useEffect(() => {
    if (simDate) {
      const d = new Date(simDate)
      d.setHours(0, 0, 0, 0)
      setCalView(new Date(d.getFullYear(), d.getMonth(), 1))
    }
  }, [simDate])

  function changeMonth(dir) {
    setCalView(prev => new Date(prev.getFullYear(), prev.getMonth() + dir, 1))
    // También desplazar la fecha simulada si el padre provee el handler
    try {
      if (onDateChange) {
        const base = simDate ? new Date(simDate) : new Date()
        base.setHours(0, 0, 0, 0)
        const nueva = new Date(base.getFullYear(), base.getMonth() + dir, base.getDate())
        onDateChange(nueva)
      }
    } catch (e) { }
  }

  function renderDias() {
    const y = calView.getFullYear()
    const m = calView.getMonth()
    const first = new Date(y, m, 1).getDay()
    const total = new Date(y, m + 1, 0).getDate()
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const cells = []
    for (let i = 0; i < first; i++) {
      cells.push(<div key={`e${i}`} className="cal-day empty" />)
    }
    for (let d = 1; d <= total; d++) {
      const thisDate = new Date(y, m, d)
      const isToday = thisDate.getTime() === today.getTime()
      const isSel = simDate && thisDate.toDateString() === new Date(simDate).toDateString()
      cells.push(
        <button
          key={d}
          className={`cal-day ${isToday ? "today" : ""} ${isSel ? "selected" : ""}`}
          onClick={() => onDateChange(thisDate)}
        >{d}</button>
      )
    }
    return cells
  }

  const simDateStr = simDate
    ? `${new Date(simDate).getDate()} ${MESES[new Date(simDate).getMonth()]} ${new Date(simDate).getFullYear()}`
    : "Hoy"

  return (
    <div className="sidebar">
      <div>
        <div className="cal-header">
          <button className="cal-nav" onClick={() => changeMonth(-1)}>‹</button>
          <span className="cal-month">{MESES[calView.getMonth()]} {calView.getFullYear()}</span>
          <button className="cal-nav" onClick={() => changeMonth(1)}>›</button>
        </div>
        <div className="cal-grid" style={{ marginTop: 4 }}>
          {DIAS.map(d => <div key={d} className="cal-dow">{d}</div>)}
        </div>
        <div className="cal-grid">{renderDias()}</div>
        <div className="sim-date-box">
          <div className="sim-date-label">FECHA SIMULADA</div>
          <div className="sim-date-val">{simDateStr}</div>
        </div>
      </div>
      <div className="sidebar-alerts">
        <div className="sidebar-section-title">⚠ Por vencer</div>
        {alertas.length === 0
          ? <div className="side-ok">✓ Todo en buen estado</div>
          : alertas.slice(0, 8).map(it => {
            const dias = calcularDiasRestantes(it)
            console.log("Sidebar alert:", { nombre: it.nombre, fechaVence: it.fechaVence, dias, simDate })
            return (
              <div key={it.id} className={`mini-alert ${dias <= 2 ? "" : "warn"}`}>
                <div className="mini-alert-name">{it.nombre}</div>
                <div className="mini-alert-days">{dias}d restantes</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}