package com.ohms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ohms.model.Product;
import com.ohms.service.InventoryService;


@RestController
@RequestMapping("/inventory")
public class Controller {
	
	@Autowired
	private InventoryService inventoryService;
	
	@PostMapping("/add")
	public String addProduct(@RequestBody Product product) {
		inventoryService.addProduct(product);
		return "Product Added Successfully";
	}
	
	@GetMapping("/get")
	public List<Product> getAllProducts(){
		return inventoryService.getAllProducts();
	}
	
	@GetMapping("/get/{productId}")
	public Optional<Product> getProductById(@PathVariable int productId) {
		return inventoryService.getProductById(productId);
	}
	
	@PutMapping("/update/{productId}")
	public String updateProduct(@PathVariable int productId, @RequestBody Product product) {
		inventoryService.updateProduct(productId, product);
		return "Update Successfully";
	}
	
	@DeleteMapping("/delete/{productId}")
	public String deleteProduct(@PathVariable int productId) {
		inventoryService.deleteProduct(productId);
		return "Deleted Successfully";
	}

}
