package com.freshtouch.freshtouch_api.service;

import com.freshtouch.freshtouch_api.model.Compra;
import com.freshtouch.freshtouch_api.repository.CompraRepository;
import com.freshtouch.freshtouch_api.repository.ItemCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ItemCompraService {

    @Autowired
    private ItemCompraRepository itemCompraRepository;

    @Autowired
    private CompraRepository compraRepository;

    public void eliminarItem(Long compraId, Long itemId) {
        itemCompraRepository.deleteById(itemId);
        // si la compra queda sin items la eliminamos tambien
        Optional<Compra> compra = compraRepository.findById(compraId);
        compra.ifPresent(c -> {
            if (c.getItems() == null || c.getItems().isEmpty()) {
                compraRepository.deleteById(compraId);
            }
        });
    }
}