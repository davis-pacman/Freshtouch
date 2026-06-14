import { useState } from "react"
import { guardarCompra } from "../services/api"

const CATS = [
  {
    id: "lacteos", label: "Lacteos", icon: "🥛", productos: [
      { id: "leche", n: "Leche entera", d: 7, da: 3 }, { id: "yogur", n: "Yogur", d: 14, da: 10 },
      { id: "queso_fresco", n: "Queso fresco", d: 14, da: 7 }, { id: "queso_crema", n: "Queso crema", d: 21, da: 14 },
      { id: "mantequilla", n: "Mantequilla", d: 60, da: 30 }, { id: "crema", n: "Crema", d: 10, da: 7 },
      { id: "mozzarella", n: "Mozzarella", d: 7, da: 5 }, { id: "kefir", n: "Kefir", d: 14, da: 10 }
    ]
  },
  {
    id: "carnes", label: "Carnes", icon: "🥩", productos: [
      { id: "pollo", n: "Pollo entero", d: 3, da: 3 }, { id: "pechuga", n: "Pechuga", d: 3, da: 3 },
      { id: "res_filete", n: "Res filete", d: 4, da: 4 }, { id: "res_molida", n: "Res molida", d: 2, da: 2 },
      { id: "cerdo", n: "Cerdo", d: 4, da: 4 }, { id: "pavo", n: "Pavo", d: 3, da: 3 },
      { id: "higado", n: "Higado", d: 2, da: 2 }, { id: "chorizos", n: "Chorizos", d: 3, da: 3 }
    ]
  },
  {
    id: "embutidos", label: "Embutidos", icon: "🌭", productos: [
      { id: "jamon", n: "Jamon", d: 14, da: 7 }, { id: "mortadela", n: "Mortadela", d: 7, da: 5 },
      { id: "salchicha", n: "Salchicha", d: 7, da: 5 }, { id: "tocino", n: "Tocino", d: 7, da: 5 },
      { id: "salame", n: "Salame", d: 21, da: 14 }, { id: "pepperoni", n: "Pepperoni", d: 21, da: 14 }
    ]
  },
  {
    id: "pescados", label: "Pescados", icon: "🐟", productos: [
      { id: "salmon", n: "Salmon", d: 2, da: 2 }, { id: "atun", n: "Atun", d: 2, da: 2 },
      { id: "camarones", n: "Camarones", d: 2, da: 2 }, { id: "tilapia", n: "Tilapia", d: 2, da: 2 },
      { id: "corvina", n: "Corvina", d: 2, da: 2 }, { id: "pulpo", n: "Pulpo", d: 3, da: 3 }
    ]
  },
  {
    id: "frutas", label: "Frutas", icon: "🍎", productos: [
      { id: "manzana", n: "Manzana", d: 21, da: 7 }, { id: "fresas", n: "Fresas", d: 7, da: 5 },
      { id: "uvas", n: "Uvas", d: 10, da: 7 }, { id: "kiwi", n: "Kiwi", d: 14, da: 7 },
      { id: "mango", n: "Mango cortado", d: 5, da: 4 }, { id: "aguacate", n: "Aguacate", d: 3, da: 2 },
      { id: "naranja", n: "Naranja", d: 14, da: 10 }, { id: "arandano", n: "Arandanos", d: 10, da: 7 }
    ]
  },
  {
    id: "verduras", label: "Verduras", icon: "🥦", productos: [
      { id: "lechuga", n: "Lechuga", d: 7, da: 5 }, { id: "tomate", n: "Tomate", d: 7, da: 5 },
      { id: "zanahoria", n: "Zanahoria", d: 21, da: 14 }, { id: "brocoli", n: "Brocoli", d: 7, da: 5 },
      { id: "espinaca", n: "Espinaca", d: 5, da: 3 }, { id: "pepino", n: "Pepino", d: 10, da: 7 },
      { id: "pimiento", n: "Pimiento", d: 14, da: 10 }, { id: "hongos", n: "Hongos", d: 7, da: 5 }
    ]
  },
  {
    id: "huevos", label: "Huevos", icon: "🥚", productos: [
      { id: "huevos", n: "Huevos", d: 21, da: 21 }, { id: "claras", n: "Claras", d: 4, da: 4 },
      { id: "yemas", n: "Yemas", d: 3, da: 3 }, { id: "huevo_duro", n: "Huevo duro", d: 7, da: 7 }
    ]
  },
  {
    id: "bebidas", label: "Bebidas", icon: "🧃", productos: [
      { id: "jugo", n: "Jugo natural", d: 3, da: 3 }, { id: "refresco", n: "Refresco", d: 7, da: 5 },
      { id: "vino", n: "Vino abierto", d: 7, da: 5 }, { id: "cerveza", n: "Cerveza", d: 90, da: 3 },
      { id: "te_helado", n: "Te helado", d: 5, da: 5 }, { id: "kombucha", n: "Kombucha", d: 14, da: 7 }
    ]
  },
  {
    id: "panaderia", label: "Panaderia", icon: "🥐", productos: [
      { id: "pan_molde", n: "Pan de molde", d: 7, da: 5 }, { id: "masa_pizza", n: "Masa pizza", d: 3, da: 3 },
      { id: "croissant", n: "Croissant", d: 3, da: 2 }, { id: "tortillas", n: "Tortillas", d: 7, da: 5 }
    ]
  },
  {
    id: "salsas", label: "Salsas", icon: "🧴", productos: [
      { id: "mayonesa", n: "Mayonesa", d: 60, da: 30 }, { id: "ketchup", n: "Ketchup", d: 180, da: 90 },
      { id: "guacamole", n: "Guacamole", d: 3, da: 3 }, { id: "hummus", n: "Hummus", d: 7, da: 7 },
      { id: "pesto", n: "Pesto", d: 7, da: 7 }, { id: "salsa_tomate", n: "Salsa tomate", d: 14, da: 7 }
    ]
  },
  {
    id: "preparados", label: "Sobrantes", icon: "🍱", productos: [
      { id: "arroz", n: "Arroz cocido", d: 4, da: 4 }, { id: "sopa", n: "Sopa", d: 3, da: 3 },
      { id: "pasta", n: "Pasta", d: 3, da: 3 }, { id: "pizza", n: "Pizza", d: 4, da: 4 },
      { id: "guiso", n: "Guiso", d: 4, da: 4 }, { id: "pollo_cocido", n: "Pollo cocido", d: 4, da: 4 }
    ]
  },
  {
    id: "medicamentos", label: "Medicamentos", icon: "💊", productos: [
      { id: "insulina", n: "Insulina abierta", d: 90, da: 28 }, { id: "jarabe", n: "Jarabe", d: 90, da: 30 },
      { id: "probioticos", n: "Probioticos", d: 60, da: 30 }, { id: "eye_drops", n: "Gotas oculares", d: 90, da: 30 }
    ]
  }
]

export default function NuevaCompra({ onGuardado }) {
  const [activeCat, setActiveCat] = useState(null)
  const [cart, setCart] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  function toggleProd(cat, prod) {
    const key = `${cat.id}:${prod.id}`
    setCart(prev => {
      const next = { ...prev }
      if (next[key]) delete next[key]
      else next[key] = { nombre: prod.n, categoria: cat.label, diasVida: isOpen ? prod.da : prod.d, estaAbierto: isOpen }
      return next
    })
  }

  function cambiarEstado(abierto) {
    setIsOpen(abierto)
    setCart({})
  }

  async function handleGuardar() {
    const hoy = new Date()
    const items = Object.values(cart).map(it => ({
      nombre: it.nombre,
      categoria: it.categoria,
      estaAbierto: it.estaAbierto,
      diasVida: it.diasVida,
      fechaIngreso: hoy.toISOString().split("T")[0],
      fechaVence: new Date(hoy.getTime() + it.diasVida * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    }))
    const compra = {
      codigo: `compra-${String(Date.now()).slice(-4)}`,
      fecha: hoy.toISOString().split("T")[0],
      items
    }
    await guardarCompra(compra)
    setCart({})
    setActiveCat(null)
    onGuardado()
  }

  const n = Object.keys(cart).length
  const cat = CATS.find(c => c.id === activeCat)

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
      <div className="scroll-area">
        <div className="cat-nav">
          {CATS.map(c => (
            <button key={c.id} className={`cat-btn ${activeCat === c.id ? "selected" : ""}`}
              onClick={() => setActiveCat(c.id)}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        {activeCat && (
          <div className="open-state-bar">
            <span className="open-state-label">Estado:</span>
            <button className={`state-btn ${!isOpen ? "active-state" : ""}`} onClick={() => cambiarEstado(false)}>Sellado</button>
            <button className={`state-btn ${isOpen ? "active-state" : ""}`} onClick={() => cambiarEstado(true)}>Abierto</button>
          </div>
        )}
        <div className="section-title">{cat ? `${cat.icon} ${cat.label}` : "Selecciona una categoria"}</div>
        <div className="prod-grid">
          {cat?.productos.map(p => {
            const key = `${cat.id}:${p.id}`
            const inCart = !!cart[key]
            const dias = isOpen ? p.da : p.d
            return (
              <button key={p.id} className={`prod-btn ${inCart ? "in-cart" : ""}`}
                onClick={() => toggleProd(cat, p)}>
                {p.n}
                <div className="prod-days-small">{dias}d en refri</div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="cart-bar">
        <span className="cart-count">{n} producto{n !== 1 ? "s" : ""}</span>
        <div style={{ flex: 1 }} />
        <button className="btn-primary" disabled={n === 0} onClick={handleGuardar}>Guardar compra</button>
      </div>
    </div>
  )
}