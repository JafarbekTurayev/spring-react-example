package com.example.testserver.service;

import com.example.testserver.entity.Category;
import com.example.testserver.payload.ApiResponse;
import com.example.testserver.payload.CategoryDTO;
import com.example.testserver.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public ApiResponse addCategory(CategoryDTO categoryDTO) {
        boolean exists = categoryRepository.existsByName(categoryDTO.getName());
        if (exists)return new ApiResponse("Bunday categoriya mavjud",false);
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setActive(true);
        categoryRepository.save(category);
        return new ApiResponse("Saqlandi", true);
    }

    public ApiResponse editCategory(Integer id, CategoryDTO categoryDTO) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (!optionalCategory.isPresent()) return new ApiResponse("Bunday categoriya mavjud emas",false);
        Category category = optionalCategory.get();
        category.setName(categoryDTO.getName());
        categoryRepository.save(category);
        return new ApiResponse("edited",true);
    }

    public List<Category> getAll() {
        List<Category> categoryList = categoryRepository.findAll();
        return categoryList;
    }

    public ApiResponse getOne(int id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent())return new ApiResponse("Bunday categoriya mavjud emas",false);
        return new ApiResponse("ok",true,categoryOptional.get());
    }

    public ApiResponse deleteCategory(int id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent())return new ApiResponse("Bunday categoriya mavjud emas",false);
        categoryRepository.deleteById(id);
        return new ApiResponse("O'chirildi",true);
    }
}
