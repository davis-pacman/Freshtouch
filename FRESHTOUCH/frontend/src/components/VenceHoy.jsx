import { useEffect, useState } from "react"
import { getCompras, eliminarItem } from "../services/api"

export default function VenceHoy({ simDate }) {
  const [items, setItems] = useState([])

  useEffect(() => { cargar() }, [simDate])

  function cargar() {
    getCompras().then(res => {
      const compras = Array.isArray(res.data) ? res.data : []
      const allItems = compras.flatMap(c => (c.items || []).map(i => ({ ...i, compra: c })))
      // calcular días relativos a simDate
      const msPerDay = 24 * 60 * 60 * 1000
      const base = simDate ? new Date(simDate) : new Date()
      base.setHours(0, 0, 0, 0)
      const normalize = (fecha) => {
        const fv = new Date(fecha + 'T00:00:00')
        fv.setHours(0, 0, 0, 0)
        return Math.round((fv.getTime() - base.getTime()) / msPerDay)
      }
      const filtered = allItems
        .map(it => ({ ...it, dias: normalize(it.fechaVence) }))
        .filter(it => it.dias <= 1 && it.dias >= 0)
      setItems(filtered)
    }).catch(() => setItems([]))
  }

  async function handleEliminar(it) {
    await eliminarItem(it.compra?.id, it.id)
    cargar()
  }

  if (!items.length) return (
    <div className="scroll-area">
      <div className="empty-state"><div className="empty-icon">✅</div><div className="empty-text">Nada vence hoy</div></div>
    </div>
  )

  return (
    <div className="scroll-area">
      <div className="section-title" style={{ color: "var(--danger-text)", marginBottom: 10 }}>🚨 Vence hoy / mañana</div>
      <div className="vence-hoy-list">
        {items.map(it => {
          const d = it.dias
          return (
            <div key={it.id} className={`vence-card ${d <= 0 ? "" : "warn-card"}`}>
              <div>
                <div className="vence-name">{it.nombre}</div>
                <div className="vence-sub">{it.categoria}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="vence-days">{d === 0 ? "HOY" : `${d}d`}</div>
                <button className="btn-danger" style={{ marginTop: 4 }} onClick={() => handleEliminar(it)}>Usar / Eliminar</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}