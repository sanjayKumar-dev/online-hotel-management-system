package com.ohms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Product;
import com.ohms.repository.InventoryRepository;

@Service
public class InventoryService {
	
	@Autowired
	private InventoryRepository inventoryRepository;
	
	public void addProduct(Product product) {
		inventoryRepository.save(product);
	}
	
	public List<Product> getAllProducts(){
		return inventoryRepository.findAll();
	}
	
	public Optional<Product> getProductById(int productId) {
		return inventoryRepository.findById(productId);
	}
	
	public void updateProduct(int productId, Product product) {
		inventoryRepository.save(product);
	}
	
	public void deleteProduct(int productId) {
		inventoryRepository.deleteById(productId);
	}

}
