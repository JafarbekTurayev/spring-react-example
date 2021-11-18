package com.example.testserver.repository;

import com.example.testserver.entity.BasketProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketProductRepository extends JpaRepository<BasketProduct,Integer> {
}
