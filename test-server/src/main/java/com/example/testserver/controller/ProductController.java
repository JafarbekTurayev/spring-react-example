package com.example.testserver.controller;

import com.example.testserver.payload.ApiResponse;
import com.example.testserver.payload.ProductDto;
import com.example.testserver.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping
    public HttpEntity<?>addProduct(@RequestBody ProductDto productDto){
        ApiResponse apiResponse = productService.addProduct(productDto);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);

    }

    @GetMapping
    public HttpEntity<?>getProduct(){
        ApiResponse apiResponse = productService.getProduct();
        return ResponseEntity.ok(apiResponse);

    }

    @GetMapping("/{id}")
    public HttpEntity<?>getOne(@PathVariable Integer id){
        ApiResponse apiResponse = productService.getOne(id);
        return  ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?>editProduct(@PathVariable Integer id,@RequestBody ProductDto productDto){
        ApiResponse apiResponse = productService.editProduct(id,productDto);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?>deleteProduct(@PathVariable Integer id){
        ApiResponse apiResponse =productService.deleteProduct(id);
        return ResponseEntity.ok(apiResponse);
    }


}
