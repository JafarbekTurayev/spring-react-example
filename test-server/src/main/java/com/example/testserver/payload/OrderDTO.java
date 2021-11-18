package com.example.testserver.payload;

import com.example.testserver.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private List<BasketProductDTO>basketProductsDTO;
    private double summa;
    private Integer client;
}
