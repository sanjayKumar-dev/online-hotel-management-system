package com.ohms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ohms.model.Product;

@Repository
public interface InventoryRepository extends MongoRepository<Product, Integer> {

}
