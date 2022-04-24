package com.ohms.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {
	@Bean
	public RouteLocator routeLocatorInvenory(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route(p->p
						.path("/guest/get")
						.uri("http://localhost:8081")
						)
				.route(p->p
						.path("/guest/add")
						.uri("http://localhost:8081")
						)
				.route(p->p
						.path("/guest/get/{id}")
						.uri("http://localhost:8081")
						)
				.route(p->p
						.path("/guest/update/{id}")
						.uri("http://localhost:8081")
						)
				.route(p->p
						.path("/guest/delete/{id}")
						.uri("http://localhost:8081")
						)
				.build();		
	}

}
