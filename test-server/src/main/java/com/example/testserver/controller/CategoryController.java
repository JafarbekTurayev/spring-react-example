package com.example.testserver.controller;

import com.example.testserver.entity.Category;
import com.example.testserver.payload.ApiResponse;
import com.example.testserver.payload.CategoryDTO;
import com.example.testserver.repository.CategoryRepository;
import com.example.testserver.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @PostMapping("/add")
    public HttpEntity<?> addCategory(@RequestBody CategoryDTO categoryDTO) {
        ApiResponse apiResponse = categoryService.addCategory(categoryDTO);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> editedCategory(@PathVariable Integer id, @RequestBody CategoryDTO categoryDTO) {
        ApiResponse apiResponse = categoryService.editCategory(id, categoryDTO);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> gelAll() {
        List<Category> categoryList = categoryService.getAll();
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping("/getOne/{id}")
    public ResponseEntity<?> getOneCategory(@PathVariable int id) {
        ApiResponse apiResponse = categoryService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable int id) {
        ApiResponse apiResponse = categoryService.deleteCategory(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
