
package com.freshtouch.freshtouch_api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "items_compra")
public class ItemCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String categoria;
    private Boolean estaAbierto;
    private Integer diasVida;
    private LocalDate fechaIngreso;
    private LocalDate fechaVence;

    @ManyToOne
    @JoinColumn(name = "compra_id")
    @JsonBackReference
    private Compra compra;
}