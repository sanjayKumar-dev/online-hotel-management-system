package com.ohms.service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ohms.model.BookedRooms;
import com.ohms.model.Booking;
import com.ohms.model.BookingResponse;
import com.ohms.model.Payment;
import com.ohms.model.RoomDTO;
import com.ohms.notification.EmailNotification;
import com.ohms.repository.BookingRepository;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private WebClient.Builder webClientBuilder;
	
	@Autowired
	private EmailNotification emailNotification;
	
	@Autowired
	private BookedRoomService bookedRoomService;
	
	@Autowired
	private SequenceService sequenceService;
	
	/*
	 * This Method takes Booking object as input and get room price from 
	 * room-service and calculate the total price.
	 */
	
	public ResponseEntity<?> addBookingDetail(Booking booking) {	
		
		if(bookedRoomService.exitsByCheckInDate(booking.getCheckInDate())) {
			BookedRooms bookedRooms = bookedRoomService.findByDate(booking.getCheckInDate());
			List<String> listOfRooms = bookedRooms.getRoomIds();
			if(listOfRooms.contains(booking.getRoomId())) {
				return ResponseEntity.badRequest().body(new BookingResponse("Already room booked for particular date", 0.0, booking.getBookingId()));
			}
		}
		
		int getId = sequenceService.getNextSequence("booking");
		booking.setBookingId(getId);
		
		String _uri = "http://localhost:8082/room/getroomprice/"+booking.getRoomId();
		double roomPrice = webClientBuilder.build().get()
				.uri(_uri)
				.retrieve().bodyToMono(new ParameterizedTypeReference<Double>() {}).block();
		
		Date startDate = booking.getCheckInDate();
		Date endDate = booking.getCheckOutDate();
		
		long diffInMillies = Math.abs(startDate.getTime() - endDate.getTime());
	    long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
		
		booking.setTotalPrice((double)(roomPrice*diff));
		
		bookingRepository.save(booking);
		return ResponseEntity.ok(new BookingResponse("Booking detail added", booking.getTotalPrice(), booking.getBookingId()));
	}
	
	//Return the list of Booking 
	
	public List<Booking> getAllBookingDetails(){
		return bookingRepository.findAll();
	}
	
	//Update the booking details
	
	public void updateBookingDetail(Booking booking) {
		bookingRepository.save(booking);
	}
	
	//Delete the Booking Detail
	
	public void deleteBooking(int bookingId) {
		bookingRepository.deleteById(bookingId);
	}
	
	//Return booking detail for requested bookingID
	
	public Booking getBookingById(int bookingId) {
		return bookingRepository.findById(bookingId).get();
	}
	
	//Return List of booking detail for particular checkInDate
	
	public List<Booking> getBookingsByCheckInDate(Date checkInDate){
		return bookingRepository.findByCheckInDate(checkInDate);
	}
	
	/*
	 * This method use for updating the payment details.
	 * Its takes bookingId and payment detail as Input
	 * After updating it will call bookingConfirmation for email notification.
	 */	
	
	public void addPaymentDetail(int bookingId,Payment payment) {
		Booking booking = bookingRepository.findById(bookingId).get();
		booking.setPaymentStatus(payment.isPaymentStatus());
		booking.setPaymentMode(payment.getPaymentMode());
		if(booking.isPaymentStatus() == true) {
			booking.setBookingStatus("Booked");
			RoomDTO roomDTO = new RoomDTO(booking.getBookingId(), booking.getCheckInDate(), booking.getRoomId());
			bookedRoomService.addRoomToBooked(roomDTO);
			finalBookingConfirmation(booking.getGuestId(), booking);
		}
		
		updateBookingDetail(booking);		
	}

	/*
	 * This function used for sending final confirmation to Guest email.
	*/
	
	public void finalBookingConfirmation(int guestID, Booking booking) {
		String _uri = "http://localhost:8081/guest/getemailid/"+guestID;
		String guestEmail = webClientBuilder.build().get()
				.uri(_uri)
				.retrieve().bodyToMono(new ParameterizedTypeReference<String>() {}).block();
		
		String subject = "Booking Confirmatiom for BookingId: "+booking.getBookingId();
		String body = "This mail is regarding confirmation for the Booking ID : "+
				booking.getBookingId()+". Having Check-In-Date : "+ booking.getCheckInDate()
				+". Your payment is done by mode : "+ booking.getPaymentMode()+".";
		emailNotification.sendEmail(guestEmail, subject, body);
		
	}
	
	
	
	//Set the booking status to Booking Cancelled
	
	public String cancleBookink(int bookingId) {
		Booking booking = bookingRepository.findById(bookingId).get();
		booking.setBookingStatus("Booking Cancelled");
		bookingRepository.save(booking);
		return "Booking Cancelled";
	}
	
	public Booking getBookingDetailByRoomIdAndCheckInDate(String roomId, Date checkInDate) {
		return bookingRepository.findByRoomIdAndCheckInDate(roomId, checkInDate);
	}

}