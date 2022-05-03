package com.ohms.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

import com.ohms.model.Booking;
import com.ohms.model.Payment;
import com.ohms.service.BookingService;

/**
 * This is the controller class of Booking service Which is created for REST API
 *
 */
@RestController
@RequestMapping("/booking")
@CrossOrigin("*")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	
	@PostMapping("/add")
	@Operation(summary = "To add new Booking Detail")
	public ResponseEntity<?> addBookingDetail(@RequestBody Booking booking) {
		return bookingService.addBookingDetail(booking);
	}
	
	@GetMapping("/get")
	@Operation(summary = "Return List of booking details")
	public List<Booking> getAllBookingDetails(){
		return bookingService.getAllBookingDetails();
	}
	
	@PostMapping("/payment/{bookingId}")
	@Operation(summary = "Update payment details")
	public String addPaymentDetails(@PathVariable int bookingId, @RequestBody Payment payment) {
		bookingService.addPaymentDetail(bookingId, payment);
		return "Updated the payment detail";
	}
	
	@GetMapping("/cancel/{bookingId}")
	@Operation(summary = "Cancel the existing booking")
	public String cancleBookink(@PathVariable int bookingId) {
		return bookingService.cancleBookink(bookingId);
	}
	
	@GetMapping("/get/{bookingId}")
	@Operation(summary = "Return booking detail for requested bookingId")
	public Booking getBookingById(@PathVariable int bookingId) {
		return bookingService.getBookingById(bookingId);		
	}
	
	@GetMapping("/getbycheckindate/{checkInDate}")
	@Operation(summary = "Return List of booking detail for particular checkInDate")
	public List<Booking> getBookingsByCheckInDate(@PathVariable Date checkInDate){
		return bookingService.getBookingsByCheckInDate(checkInDate);
	}
	
	@GetMapping("/gbridandcid/{roomId}/{checkInDate}")
	public Booking getBookingDetailByRoomIdAndCID(@PathVariable String roomId, @PathVariable Date checkInDate) {
		return bookingService.getBookingDetailByRoomIdAndCheckInDate(roomId, checkInDate);
	}
}
