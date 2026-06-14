package com.freshtouch.freshtouch_api.repository;

import com.freshtouch.freshtouch_api.model.HistorialVencido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistorialVencidoRepository extends JpaRepository<HistorialVencido, Long> {
}