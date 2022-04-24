package com.ohms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info=@Info(title="Guest API",version="1.0",description="Guest microservice"))
public class GuestServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GuestServiceApplication.class, args);
	}

}
