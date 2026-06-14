package com.freshtouch.freshtouch_api.controller;

import com.freshtouch.freshtouch_api.service.ItemCompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class ItemCompraController {

    @Autowired
    private ItemCompraService itemCompraService;

    @DeleteMapping("/{compraId}/items/{itemId}")
    public ResponseEntity<Void> eliminarItem(
            @PathVariable Long compraId,
            @PathVariable Long itemId) {
        itemCompraService.eliminarItem(compraId, itemId);
        return ResponseEntity.ok().build();
    }
}