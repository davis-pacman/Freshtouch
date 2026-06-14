package com.freshtouch.freshtouch_api.repository;

import com.freshtouch.freshtouch_api.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
}