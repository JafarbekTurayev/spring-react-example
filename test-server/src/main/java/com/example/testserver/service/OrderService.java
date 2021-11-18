package com.example.testserver.service;

import com.example.testserver.entity.BasketProduct;
import com.example.testserver.entity.Client;
import com.example.testserver.entity.Order;
import com.example.testserver.entity.Product;
import com.example.testserver.payload.ApiResponse;
import com.example.testserver.payload.BasketProductDTO;
import com.example.testserver.payload.OrderDTO;
import com.example.testserver.repository.BasketProductRepository;
import com.example.testserver.repository.ClientRepository;
import com.example.testserver.repository.OrderRepository;
import com.example.testserver.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {


    @Autowired
    BasketProductRepository basketProductRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ClientRepository clientRepository;

    public ApiResponse makeOrder(OrderDTO orderDTO) {
        double total = 0;
        Order order = new Order();
        Optional<Client> optionalClient = clientRepository.findById(orderDTO.getClient());
        if (!optionalClient.isPresent()) {
            return new ApiResponse("Client not found", false);
        }
        order.setClient(optionalClient.get());
        orderRepository.save(order);
        List<BasketProductDTO> basketProductDTOList = orderDTO.getBasketProductsDTO();
        List<BasketProduct> basketProducts = new ArrayList<>();

        for (BasketProductDTO basketProductDTO : basketProductDTOList) {
            BasketProduct basketProduct = new BasketProduct();
            Optional<Product> optionalProduct = productRepository.findById(basketProductDTO.getProductId());
            if (!optionalProduct.isPresent()) {
                return new ApiResponse("Product not found", false);
            }
            basketProduct.setProduct(optionalProduct.get());
            basketProduct.setAmount(basketProductDTO.getAmount());
            basketProductRepository.save(basketProduct);
            basketProducts.add(basketProduct);
            total += optionalProduct.get().getPrice() * basketProduct.getAmount();
        }
        order.setSumma(total);
        order.setPayed(true);
        order.setBasketProducts(basketProducts);
        orderRepository.save(order);
        return new ApiResponse("Saved", true);

    }

    public ApiResponse getOrders() {
        return new ApiResponse("Found", true, orderRepository.findAll());

    }

    public ApiResponse getOne(Integer id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (!optionalOrder.isPresent()) {
            return new ApiResponse("Order not exists", false);
        }
        return new ApiResponse("Found", true, optionalOrder.get());
    }


    public ApiResponse deleteById(int id) {
        orderRepository.deleteById(id);
        return new ApiResponse("Deleted", true);
    }

    public ApiResponse editOrder(OrderDTO orderDTO, Integer id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (!optionalOrder.isPresent()) {
            return new ApiResponse("Order not found", false);
        }
        Order order = optionalOrder.get();
        Optional<Client> optionalClient = clientRepository.findById(orderDTO.getClient());
        if (!optionalOrder.isPresent()) {
            return new ApiResponse("Client not found", false);
        }
        order.setClient(optionalClient.get());
        orderRepository.save(order);
        return new ApiResponse("Edited", true, order);
    }
}
