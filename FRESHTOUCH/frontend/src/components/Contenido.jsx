import { useEffect, useState } from "react"
import { getCompras, eliminarItem } from "../services/api"

export default function Contenido({ simDate }) {
  const [compras, setCompras] = useState([])

  useEffect(() => { cargar() }, [])

  function cargar() {
    getCompras().then(res => setCompras(res.data)).catch(() => { })
  }

  function daysLeft(fechaVence) {
    const msPerDay = 24 * 60 * 60 * 1000
    const base = simDate ? new Date(simDate) : new Date()
    base.setHours(0, 0, 0, 0)
    // Parsear la fecha como medianoche local para mantener consistencia con Sidebar
    const fv = new Date(fechaVence + 'T00:00:00')
    fv.setHours(0, 0, 0, 0)
    return Math.round((fv.getTime() - base.getTime()) / msPerDay)
  }

  function daysCls(d) {
    return d <= 0 ? "days-danger" : d <= 3 ? "days-danger" : d <= 7 ? "days-warn" : "days-ok"
  }

  async function handleEliminar(compraId, itemId) {
    await eliminarItem(compraId, itemId)
    cargar()
  }

  const comprasArr = Array.isArray(compras) ? compras : []
  const items = comprasArr.flatMap(c => (c.items || []).map(i => ({ ...i, compraId: c.id })))
  const byCat = {}
  items.forEach(it => {
    if (!byCat[it.categoria]) byCat[it.categoria] = []
    byCat[it.categoria].push(it)
  })

  if (!items.length) return (
    <div className="scroll-area">
      <div className="empty-state"><div className="empty-icon">🧊</div><div className="empty-text">La refrigeradora esta vacia</div></div>
    </div>
  )

  return (
    <div className="scroll-area">
      {Object.entries(byCat).map(([cat, catItems]) => (
        <div key={cat} className="cat-section">
          <div className="cat-section-header">
            <span className="cat-section-title">{cat}</span>
          </div>
          {catItems.map(it => {
            const d = daysLeft(it.fechaVence)
            const cls = daysCls(d)
            return (
              <div key={it.id} className="item-row" style={{ marginBottom: 4 }}>
                <div style={{ flex: 1 }}>
                  <div className="item-name">
                    {it.nombre}
                    {it.estaAbierto && <span style={{ fontSize: 18, color: "var(--warn-text)", marginLeft: 4 }}>(abierto)</span>}
                  </div>
                  <div className={`item-days-txt ${cls}`}>
                    {d > 0 ? `${d} dias restantes` : d === 0 ? "Vence HOY" : "VENCIDO"}
                  </div>
                </div>
                <button className="btn-danger" onClick={() => handleEliminar(it.compraId, it.id)}>Eliminar</button>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}