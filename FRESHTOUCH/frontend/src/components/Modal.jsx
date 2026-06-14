export default function Modal({ items, titulo, subtitulo, onClose }) {
  if (!items || !Array.isArray(items) || items.length === 0) return null

  const msPerDay = 1000 * 60 * 60 * 24

  function daysUntil(fecha) {
    // Parsear la fecha como medianoche local para mantener consistencia con Sidebar
    const fv = new Date(fecha + 'T00:00:00')
    fv.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Math.round((fv.getTime() - today.getTime()) / msPerDay)
  }

  const hasCritical = items.some(i => {
    const d = daysUntil(i.fechaVence)
    return d <= 1
  })

  return (
    <div className="modal-overlay">
      <div className={`modal-box ${hasCritical ? "" : "warn-modal"}`}>
        <div className="modal-header">
          <span className="modal-icon">{hasCritical ? "🚨" : "⚠️"}</span>
          <div>
            <div className="modal-title">{titulo || "Productos por vencer"}</div>
            <div className="modal-subtitle">{subtitulo || `${items.length} productos`}</div>
          </div>
        </div>
        <div className="modal-list">
          {items.map(it => {
            const d = daysUntil(it.fechaVence)
            const cls = d <= 0 ? "days-danger" : d <= 3 ? "days-danger" : "days-warn"
            return (
              <div key={it.id} className="modal-item">
                <span className="modal-item-name">{it.nombre}</span>
                <span className={`modal-item-days ${cls}`}>{d >= 0 ? `${d}d` : "Vencido"}</span>
              </div>
            )
          })}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cerrar</button>
          <button className="btn-primary" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  )
}