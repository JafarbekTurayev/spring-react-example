package com.example.testserver.repository;

import com.example.testserver.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository <Product,Integer>{
}
