import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL + '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

function normalizeResponse(res) {
  const data = res && res.data !== undefined ? res.data : null
  if (typeof data === 'string') {
    try {
      return { data: JSON.parse(data) }
    } catch (e) {
      return { data: [] }
    }
  }
  return { data }
}

export const getCompras = () => api.get('/compras').then(normalizeResponse)
export const guardarCompra = (compra) => api.post('/compras', compra).then(normalizeResponse)
export const eliminarCompra = (id) => api.delete(`/compras/${id}`).then(normalizeResponse)
export const eliminarItem = (compraId, itemId) => api.delete(`/compras/${compraId}/items/${itemId}`).then(normalizeResponse)
export const getAlertas = () => api.get('/alertas').then(normalizeResponse)
export const getVenceHoy = () => api.get('/vence-hoy').then(normalizeResponse)
export const getVencidos = () => api.get('/vencidos').then(normalizeResponse)
export const getHistorialVencidos = () => api.get('/historial-vencidos').then(normalizeResponse)
export const registrarVencido = (vencido) => api.post('/historial-vencidos', vencido).then(normalizeResponse)