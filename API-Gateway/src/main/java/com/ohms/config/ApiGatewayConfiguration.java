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
						.uri("lb://guest-service/")
						)
				.route(p->p
						.path("/guest/add")
						.uri("lb://guest-service/")
						)
				.route(p->p
						.path("/guest/get/{id}")
						.uri("lb://guest-service/")
						)
				.route(p->p
						.path("/guest/update")
						.uri("lb://guest-service/")
						)
				.route(p->p
						.path("/guest/delete/{id}")
						.uri("lb://guest-service/")
						)
				.route(p->p
						.path("/guest/getByEmail/{emailId}")
						.uri("lb://guest-service/")
				)
				.build();		
	}

	@Bean
	public RouteLocator routeLocatorRoom(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route(p->p
						.path("/room/get")
						.uri("lb://room-service/")
				)
				.route(p->p
						.path("/room/add")
						.uri("lb://room-service/")
				)
				.route(p->p
						.path("/room/get/{roomId}")
						.uri("lb://room-service/")
				)
				.route(p->p
						.path("/room/update")
						.uri("lb://room-service/")
				)
				.route(p->p
						.path("/room/delete/{roomId}")
						.uri("lb://room-service/")
				)
				.route(p->p
						.path("/room/getbystatus/{status}")
						.uri("lb://room-service/")
				)
				.build();
	}

}
