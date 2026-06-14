import { useEffect, useState } from "react"
import { getCompras, eliminarItem } from "../services/api"

export default function Historial({ simDate }) {
  const [compras, setCompras] = useState([])
  const [abiertos, setAbiertos] = useState({})

  useEffect(() => { cargar() }, [])

  function cargar() {
    getCompras()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        setCompras(data)
      })
      .catch(() => setCompras([]))
  }

  function toggleCompra(id) {
    setAbiertos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function daysLeft(fechaVence) {
    const base = simDate ? new Date(simDate) : new Date()
    base.setHours(0, 0, 0, 0)
    const fv = new Date(fechaVence)
    fv.setHours(0, 0, 0, 0)
    return Math.floor((fv - base) / (1000 * 60 * 60 * 24))
  }

  function daysCls(d) {
    return d <= 0 ? "days-danger" : d <= 3 ? "days-danger" : d <= 7 ? "days-warn" : "days-ok"
  }

  function tagForDays(d) {
    if (d <= 0) return <span className="tag tag-danger">VENCIDO</span>
    if (d <= 3) return <span className="tag tag-danger">critico</span>
    if (d <= 7) return <span className="tag tag-warn">pronto</span>
    return <span className="tag tag-ok">ok</span>
  }

  async function handleEliminar(compraId, itemId) {
    await eliminarItem(compraId, itemId)
    cargar()
  }

  if (!compras.length) return (
    <div className="scroll-area">
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <div className="empty-text">Sin compras registradas</div>
      </div>
    </div>
  )

  return (
    <div className="scroll-area">
      {[...compras].reverse().map(p => {
        const items = Array.isArray(p.items) ? p.items : []
        const minDays = items.length
          ? Math.min(...items.map(i => daysLeft(i.fechaVence)))
          : 99
        return (
          <div key={p.id} className="purchase-card">
            <div className="purchase-header" onClick={() => toggleCompra(p.id)}>
              <div>
                <span className="purchase-id">{p.codigo}</span>
                <div className="purchase-date">{p.fecha} · {items.length} items</div>
              </div>
              {tagForDays(minDays)}
            </div>
            {abiertos[p.id] && (
              <div className="purchase-items">
                {items.length === 0
                  ? <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: '4px 0' }}>Sin productos</div>
                  : items.map((it) => {
                    const d = daysLeft(it.fechaVence)
                    return (
                      <div key={it.id} className="item-row">
                        <div>
                          <div className="item-name">
                            {it.nombre}
                            {it.estaAbierto && <span style={{ fontSize: 18, color: "var(--warn-text)", marginLeft: 4 }}>(abierto)</span>}
                          </div>
                          <div className={`item-days-txt ${daysCls(d)}`}>
                            {d > 0 ? `${d} dias restantes` : d === 0 ? "Vence HOY" : "VENCIDO"}
                          </div>
                        </div>
                        <button className="btn-danger" onClick={() => handleEliminar(p.id, it.id)}>
                          Eliminar
                        </button>
                      </div>
                    )
                  })
                }
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}