package com.freshtouch.freshtouch_api.repository;

import com.freshtouch.freshtouch_api.model.ItemCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItemCompraRepository extends JpaRepository<ItemCompra, Long> {

    List<ItemCompra> findByFechaVenceBefore(LocalDate fecha);

    List<ItemCompra> findByFechaVenceBetween(LocalDate inicio, LocalDate fin);
}