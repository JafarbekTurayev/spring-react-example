package com.example.testserver.repository;

import com.example.testserver.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category,Integer> {

    boolean existsByName(String name);
}
