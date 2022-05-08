package com.ohms.service;

import java.util.Collections;
import java.util.Comparator;
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
import com.ohms.model.Room;
import com.ohms.model.RoomDTO;
import com.ohms.notification.EmailNotification;
import com.ohms.repository.BookedRoomRepository;
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
	
	@Autowired
	private BookedRoomRepository bookedRoomRepository;
	
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
	
	public String cancelBooking(int bookingId) {
		Booking booking = bookingRepository.findById(bookingId).get();
		booking.setBookingStatus("Booking Cancelled");
		BookedRooms bookedRooms = bookedRoomRepository.findByDate(booking.getCheckInDate());
		bookedRooms.getRoomIds().remove(booking.getRoomId());
		bookedRoomRepository.save(bookedRooms);
		bookingRepository.save(booking);
		return "Booking Cancelled";
	}
	
	// Update the check in detail
	
	public void checkIn(int bookingId) {
		Booking booking = bookingRepository.findById(bookingId).get();
		booking.setCheckInStatus(true);
		bookingRepository.save(booking);
	}
	
	// Update the check out detail
	public void checkOut(int bookingId) {
		Booking booking = bookingRepository.findById(bookingId).get();
		booking.setChekOutStatus(true);
		bookingRepository.save(booking);
	}
	
	// Return the List of room available for particular date
	
	public List<Room> getAvilableRoom(Date date){
		System.out.println(date);
		String _uri = "http://localhost:8082/room/get";		
		List<Room> roomList = webClientBuilder.build().get()
				.uri(_uri)
				.retrieve().bodyToMono(new ParameterizedTypeReference<List<Room>>() {}).block();
		BookedRooms bookedRooms = bookedRoomService.findByDate(date);
		if(bookedRooms != null) {
			List<String> bookedList = bookedRooms.getRoomIds();
			Comparator<Room> compareByRoomId = (Room r1, Room r2)-> r1.getRoomId().compareTo(r2.getRoomId());
			Collections.sort(roomList, compareByRoomId); // Sorted the roomList
			Collections.sort(bookedList);  				 // Sorted the booked room list
			int j = 0;
			for(int i=0; i<roomList.size(); i++) {
				if(roomList.get(i).getRoomId().equals(bookedList.get(j))) {
					roomList.remove(i);
					j++;
				}
			}
		}
		return roomList;
	}
	
	
	

}
