package com.freshtouch.freshtouch_api.controller;

import com.freshtouch.freshtouch_api.model.Compra;
import com.freshtouch.freshtouch_api.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @GetMapping
    public List<Compra> obtenerTodas() {
        return compraService.obtenerTodas();
    }

    @PostMapping
    public Compra guardar(@RequestBody Compra compra) {
        return compraService.guardar(compra);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        compraService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}