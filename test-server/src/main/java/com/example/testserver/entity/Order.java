package com.example.testserver.entity;

import com.example.testserver.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
@Data
public class Order extends AbsEntity {
    @OneToMany
    private List<BasketProduct> basketProducts;
    private boolean payed;
    private double summa;
    @ManyToOne
    private Client client;
}
