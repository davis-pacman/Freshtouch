package com.freshtouch.freshtouch_api.controller;

import com.freshtouch.freshtouch_api.model.HistorialVencido;
import com.freshtouch.freshtouch_api.model.ItemCompra;
import com.freshtouch.freshtouch_api.service.AlertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AlertaController {

    @Autowired
    private AlertaService alertaService;

    @GetMapping("/alertas")
    public List<ItemCompra> obtenerAlertas() {
        return alertaService.obtenerAlertas();
    }

    @GetMapping("/vence-hoy")
    public List<ItemCompra> obtenerVenceHoy() {
        return alertaService.obtenerVenceHoy();
    }

    @GetMapping("/vencidos")
    public List<ItemCompra> obtenerVencidos() {
        return alertaService.obtenerVencidos();
    }

    @GetMapping("/historial-vencidos")
    public List<HistorialVencido> obtenerHistorialVencidos() {
        return alertaService.obtenerHistorialVencidos();
    }

    @PostMapping("/historial-vencidos")
    public HistorialVencido registrarVencido(@RequestBody HistorialVencido vencido) {
        return alertaService.registrarVencido(vencido);
    }
}