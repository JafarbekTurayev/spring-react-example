package com.example.testserver.controller;

import com.example.testserver.payload.ApiResponse;
import com.example.testserver.payload.OrderDTO;
import com.example.testserver.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping
    public ResponseEntity<?> makeOrder(@RequestBody OrderDTO orderDTO){
        ApiResponse apiResponse = orderService.makeOrder(orderDTO);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }

    @GetMapping
    public ResponseEntity<?> getOrders(){
        ApiResponse apiResponse = orderService.getOrders();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>getOne(@PathVariable int id){
        ApiResponse apiResponse = orderService.getOne(id);
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteOne(@PathVariable int id){
        ApiResponse apiResponse=orderService.deleteById(id);
        return ResponseEntity.ok(apiResponse);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<?>editOne(@RequestBody OrderDTO orderDTO,@PathVariable Integer id){
        ApiResponse apiResponse = orderService.editOrder(orderDTO, id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }
}
