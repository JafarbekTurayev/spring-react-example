package com.example.testserver.entity;

import com.example.testserver.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product extends AbsEntity {
    private String name;
    private String country;
    private String description;
    private double price;
    private boolean active;

    @ManyToOne
    private Category category;
}
