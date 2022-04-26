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

import io.swagger.v3.oas.annotations.Operation;

/**
 * This is the controller class of Inventory service Which is created for REST API
 *
 */
@RestController
@RequestMapping("/inventory")
public class Controller {
	
	@Autowired
	private InventoryService inventoryService;
	
	@PostMapping("/add")
	@Operation(summary = "To add new Product into Inventory Database")
	public String addProduct(@RequestBody Product product) {
		inventoryService.addProduct(product);
		return "Product Added Successfully";
	}
	
	@GetMapping("/get")
	@Operation(summary = "Return all the Product Details in the form of list")
	public List<Product> getAllProducts(){
		return inventoryService.getAllProducts();
	}
	
	@GetMapping("/get/{productId}")
	@Operation(summary = "Return Product Detail for requested id")
	public Optional<Product> getProductById(@PathVariable int productId) {
		return inventoryService.getProductById(productId);
	}
	
	@PutMapping("/update/{productId}")
	@Operation(summary = "Update Product Detail for requested Id")
	public String updateProduct(@PathVariable int productId, @RequestBody Product product) {
		inventoryService.updateProduct(productId, product);
		return "Update Successfully";
	}
	
	@DeleteMapping("/delete/{productId}")
	@Operation(summary = "Delete Product Detail for requested Id")
	public String deleteProduct(@PathVariable int productId) {
		inventoryService.deleteProduct(productId);
		return "Deleted Successfully";
	}

}
