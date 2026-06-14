package com.freshtouch.freshtouch_api.service;

import com.freshtouch.freshtouch_api.model.HistorialVencido;
import com.freshtouch.freshtouch_api.model.ItemCompra;
import com.freshtouch.freshtouch_api.repository.HistorialVencidoRepository;
import com.freshtouch.freshtouch_api.repository.ItemCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class AlertaService {

    @Autowired
    private ItemCompraRepository itemCompraRepository;

    @Autowired
    private HistorialVencidoRepository historialVencidoRepository;

    // productos que vencen en los proximos 3 dias
    public List<ItemCompra> obtenerAlertas() {
        LocalDate hoy = LocalDate.now();
        LocalDate en3dias = hoy.plusDays(3);
        return itemCompraRepository.findByFechaVenceBetween(hoy, en3dias);
    }

    // productos que vencen hoy
    public List<ItemCompra> obtenerVenceHoy() {
        LocalDate hoy = LocalDate.now();
        LocalDate manana = hoy.plusDays(1);
        return itemCompraRepository.findByFechaVenceBetween(hoy, manana);
    }

    // productos ya vencidos
    public List<ItemCompra> obtenerVencidos() {
        LocalDate hoy = LocalDate.now();
        return itemCompraRepository.findByFechaVenceBefore(hoy);
    }

    // guardar en historial de vencidos
    public HistorialVencido registrarVencido(HistorialVencido vencido) {
        return historialVencidoRepository.save(vencido);
    }

    public List<HistorialVencido> obtenerHistorialVencidos() {
        return historialVencidoRepository.findAll();
    }
}