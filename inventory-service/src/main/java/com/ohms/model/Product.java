package com.ohms.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("Product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	
	@Id
	private int productId;
	private String productName;
	private String productCategory;
	private int quantity;
}
