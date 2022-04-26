package com.ohms.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.ohms.serice.BookingService;
import com.ohms.model.Booking;
import com.ohms.model.Payment;

@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	
	
	@PostMapping("/add")
	public double addBookingDetail(@RequestBody Booking booking) {
		return bookingService.addBookingDetail(booking);
	}
	
	@GetMapping("/get")
	public List<Booking> getAllBookingDetails(){
		return bookingService.getAllBookingDetails();
	}
	
	@PostMapping("/payment/{bookingId}")
	public String addPaymentDetails(@PathVariable int bookingId, @RequestBody Payment payment) {
		bookingService.addPaymentDetail(bookingId, payment);
		return "Updated the payment detail";
		
	}
	
	@GetMapping("/gbridandcid/{roomId}/{checkInDate}")
	public Booking getBookingDetailByRoomIdAndCID(@PathVariable String roomId, @PathVariable Date checkInDate) {
		return bookingService.getBookingDetailByRoomIdAndCheckInDate(roomId, checkInDate);
	}
}
