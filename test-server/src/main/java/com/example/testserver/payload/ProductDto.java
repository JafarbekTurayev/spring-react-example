package com.example.testserver.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    @NotNull
    private String name;
    @NotNull
    private String country;
    @NotNull
    private String description;
    @NotNull
    private double price;
    @NotNull
    private Integer categoryId;
    @NotNull
    private boolean active;
}
