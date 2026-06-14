package com.freshtouch.freshtouch_api.service;

import com.freshtouch.freshtouch_api.model.Compra;
import com.freshtouch.freshtouch_api.model.ItemCompra;
import com.freshtouch.freshtouch_api.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CompraService {

    @Autowired
    private CompraRepository compraRepository;

    public List<Compra> obtenerTodas() {
        return compraRepository.findAll();
    }

    public Compra guardar(Compra compra) {
        if (compra.getItems() != null) {
            for (ItemCompra item : compra.getItems()) {
                item.setCompra(compra);
                if (item.getFechaIngreso() == null) {
                    item.setFechaIngreso(LocalDate.now());
                }
                if (item.getFechaVence() == null && item.getDiasVida() != null) {
                    item.setFechaVence(item.getFechaIngreso().plusDays(item.getDiasVida()));
                }
            }
        }
        return compraRepository.save(compra);
    }

    public Optional<Compra> obtenerPorId(Long id) {
        return compraRepository.findById(id);
    }

    public void eliminar(Long id) {
        compraRepository.deleteById(id);
    }
}