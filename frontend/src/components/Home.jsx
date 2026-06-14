import { useEffect, useState } from "react"
import { getCompras, getAlertas } from "../services/api"

export default function Home({ onNavigate, onShowAlertas }) {
  const [stats, setStats] = useState({ total: 0, alertas: 0, compras: 0, cats: 0 })

  useEffect(() => {
    Promise.all([getCompras(), getAlertas()])
      .then(([comprasRes, alertasRes]) => {
        const items = comprasRes.data.flatMap(c => c.items || [])
        const cats = new Set(items.map(i => i.categoria))
        setStats({
          total: items.length,
          alertas: alertasRes.data.length,
          compras: comprasRes.data.length,
          cats: cats.size
        })
      })
      .catch(() => { })
  }, [])

  return (
    <div className="scroll-area">
      <div className="home-wrap">

        <div className="fridge-stats">
          <div className="stat-card"><div className="stat-num">{stats.total}</div><div className="stat-label">Productos</div></div>
          <div className="stat-card"><div className="stat-num red">{stats.alertas}</div><div className="stat-label">Alertas</div></div>
          <div className="stat-card"><div className="stat-num">{stats.compras}</div><div className="stat-label">Compras</div></div>
          <div className="stat-card"><div className="stat-num">{stats.cats}</div><div className="stat-label">Categorias</div></div>
        </div>
        <div className="menu-grid">
          <button className="menu-btn" onClick={() => onNavigate("nueva-compra")}><span className="menu-btn-icon">🛒</span>Nueva compra</button>
          <button className="menu-btn" onClick={() => onNavigate("historial")}><span className="menu-btn-icon">📋</span>Historial</button>
          <button className="menu-btn danger-btn" onClick={onShowAlertas}><span className="menu-btn-icon">🔔</span>Alertas</button>
          <button className="menu-btn" onClick={() => onNavigate("contenido")}><span className="menu-btn-icon">🗂</span>Contenido</button>
          <button className="menu-btn danger-btn" onClick={() => onNavigate("vence-hoy")}><span className="menu-btn-icon">🚨</span>Vence hoy</button>
          <button className="menu-btn" onClick={() => onNavigate("recetas")}><span className="menu-btn-icon">🍳</span>Recetas</button>
          <button className="menu-btn" onClick={() => onNavigate("vencidos")}><span className="menu-btn-icon">📊</span>Vencidos</button>
          <button className="menu-btn" onClick={() => onNavigate("recordatorios")}><span className="menu-btn-icon">💡</span>Avisos</button>
        </div>
      </div>
    </div>
  )
}