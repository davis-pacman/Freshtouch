import { useState, useEffect } from "react"
import Topbar from "./components/Topbar"
import Sidebar from "./components/Sidebar"
import Modal from "./components/Modal"
import Home from "./components/Home"
import NuevaCompra from "./components/NuevaCompra"
import Historial from "./components/Historial"
import Contenido from "./components/Contenido"
import VenceHoy from "./components/VenceHoy"
import Vencidos from "./components/Vencidos"
import { getAlertas } from "./services/api"

export default function App() {
  const [pagina, setPagina] = useState("home")
  const [simDate, setSimDate] = useState(new Date())
  const [modal, setModal] = useState(null)

  useEffect(() => {
    getAlertas()
      .then(res => {
        if (res.data.length > 0) {
          setTimeout(() => {
            setModal({
              items: res.data,
              titulo: "Productos por vencer",
              subtitulo: `${res.data.length} producto${res.data.length !== 1 ? "s" : ""} en riesgo`
            })
          }, 600)
        }
      })
      .catch(() => { })
  }, [])

  function handleDateChange(date) {
    setSimDate(date)
  }

  function handleShowAlertas() {
    getAlertas()
      .then(res => {
        setModal({
          items: res.data,
          titulo: "Alertas activas",
          subtitulo: `${res.data.length} producto${res.data.length !== 1 ? "s" : ""}`
        })
      })
      .catch(() => { })
  }

  function renderPagina() {
    switch (pagina) {
      case "home":
        return <Home onNavigate={setPagina} onShowAlertas={handleShowAlertas} />
      case "nueva-compra":
        return <NuevaCompra onGuardado={() => setPagina("historial")} />
      case "historial":
        return <Historial simDate={simDate} />
      case "contenido":
        return <Contenido simDate={simDate} />
      case "vence-hoy":
        return <VenceHoy simDate={simDate} />
      case "vencidos":
        return <Vencidos simDate={simDate} />
      default:
        return <Home onNavigate={setPagina} onShowAlertas={handleShowAlertas} />
    }
  }

  return (
    <div id="app">
      <Topbar />
      <div className="main-layout">
        <Sidebar simDate={simDate} onDateChange={handleDateChange} />
        <div className="content-area">
          <div className="nav-btns">
            {[
              { id: "home", label: "🏠 Inicio" },
              { id: "nueva-compra", label: "🛒 Compra" },
              { id: "historial", label: "📋 Historial" },
              { id: "contenido", label: "🗂 Contenido" },
              { id: "vence-hoy", label: "🚨 Vence hoy", alert: true },
              { id: "vencidos", label: "📊 Vencidos" },
            ].map(btn => (
              <button
                key={btn.id}
                className={`nav-btn ${pagina === btn.id ? "active" : ""} ${btn.alert ? "alert-nav" : ""}`}
                onClick={() => setPagina(btn.id)}
              >
                <h2>{btn.label}</h2>
              </button>
            ))}
          </div>
          <div className="screen active">
            {renderPagina()}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          items={modal.items}
          titulo={modal.titulo}
          subtitulo={modal.subtitulo}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}