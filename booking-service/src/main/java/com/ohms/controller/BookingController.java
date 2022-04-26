package com.ohms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.ohms.serice.BookingService;
import com.ohms.model.Booking;

@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private WebClient.Builder webClientBuilder;
	
	@PostMapping("/add")
	public double addBookingDetail(@RequestBody Booking booking) {
		String _uri = "http://localhost:8082/room/getroomprice/"+booking.getRoomId();
		
		double roomPrice = webClientBuilder.build().get()
				.uri(_uri)
				.retrieve().bodyToMono(new ParameterizedTypeReference<Double>() {}).block();
		
		booking.setTotalPrice(roomPrice);
		
		bookingService.addBookingDetail(booking);
		return booking.getTotalPrice();
	}
	
	@GetMapping("/get")
	public List<Booking> getAllBookingDetails(){
		return bookingService.getAllBookingDetails();
	}
	
	public String addPaymentDetails() {
		return "";
		
	}
}
