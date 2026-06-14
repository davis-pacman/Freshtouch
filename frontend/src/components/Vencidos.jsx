import { useEffect, useState } from "react"
import { getHistorialVencidos, getCompras } from "../services/api"

export default function Vencidos({ simDate }) {
  const [historial, setHistorial] = useState([])
  const [vencidosActuales, setVencidosActuales] = useState([])

  useEffect(() => {
    getHistorialVencidos().then(res => setHistorial(res.data)).catch(() => { })
  }, [])

  useEffect(() => {
    // calcular items vencidos respecto a simDate
    getCompras().then(res => {
      const compras = Array.isArray(res.data) ? res.data : []
      const allItems = compras.flatMap(c => (c.items || []).map(i => ({ ...i, compra: c })))
      const msPerDay = 24 * 60 * 60 * 1000
      const base = simDate ? new Date(simDate) : new Date()
      base.setHours(0, 0, 0, 0)
      const normalize = (fecha) => {
        const fv = new Date(fecha + 'T00:00:00')
        fv.setHours(0, 0, 0, 0)
        return Math.round((fv.getTime() - base.getTime()) / msPerDay)
      }
      const venc = allItems.map(it => ({ ...it, dias: normalize(it.fechaVence) })).filter(it => it.dias < 0)
      setVencidosActuales(venc)
    }).catch(() => setVencidosActuales([]))
  }, [simDate])

  return (
    <div className="scroll-area">
      <div className="section-title" style={{ marginBottom: 10 }}>Vencidos (respecto a la fecha seleccionada)</div>
      {vencidosActuales.length === 0
        ? <div className="empty-state"><div className="empty-icon">🧾</div><div className="empty-text">No hay productos vencidos en la fecha seleccionada</div></div>
        : vencidosActuales.map(it => (
          <div key={it.id} className="vencido-row">
            <div>
              <div className="vencido-name">{it.nombre}</div>
              <div className="vencido-date">{it.categoria} · venció {it.fechaVence}</div>
            </div>
          </div>
        ))
      }

      <div className="section-title" style={{ marginTop: 14, marginBottom: 8 }}>Registro histórico</div>
      {historial.length === 0
        ? <div className="empty-state"><div className="empty-icon">📊</div><div className="empty-text">Sin productos vencidos registrados</div></div>
        : historial.slice(0, 20).map(it => (
          <div key={it.id} className="vencido-row">
            <div>
              <div className="vencido-name">{it.nombre}</div>
              <div className="vencido-date">{it.categoria} · venció {it.fechaVencio}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}