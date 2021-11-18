package com.example.testserver.service;

import com.example.testserver.entity.Category;
import com.example.testserver.entity.Product;
import com.example.testserver.payload.ApiResponse;
import com.example.testserver.payload.ProductDto;
import com.example.testserver.repository.CategoryRepository;
import com.example.testserver.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    public ApiResponse addProduct(ProductDto productDto) {

        Product product =new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCountry(productDto.getCountry());
        product.setPrice(productDto.getPrice());
        product.setActive(productDto.isActive());

        Optional<Category> optionalCategory = categoryRepository.findById(productDto.getCategoryId());
        if (!optionalCategory.isPresent()) return new ApiResponse("Not found",false);

        product.setCategory(optionalCategory.get());
        productRepository.save(product);
        return new ApiResponse("Success!",true);
    }

    public ApiResponse getProduct() {
        List<Product> productList = productRepository.findAll();
        return new ApiResponse("Success!",true,productList);
    }

    public ApiResponse getOne(Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);
        return new ApiResponse("Success!",true,optionalProduct.get());
    }

    public ApiResponse editProduct(Integer id, ProductDto productDto) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);
        Product product = optionalProduct.get();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCountry(productDto.getCountry());
        product.setPrice(productDto.getPrice());
        product.setActive(productDto.isActive());

        Optional<Category> optionalCategory = categoryRepository.findById(productDto.getCategoryId());
        if (!optionalCategory.isPresent()) return new ApiResponse("Not found",false);

        product.setCategory(optionalCategory.get());
        productRepository.save(product);
        return new ApiResponse("Success",true);

    }

    public ApiResponse deleteProduct(Integer id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);

        productRepository.deleteById(id);
        return new ApiResponse("Success!",true);
    }
}
