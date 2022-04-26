package com.ohms.serice;

import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ohms.model.Booking;
import com.ohms.model.Payment;
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
	
	public double addBookingDetail(Booking booking) {		
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
		return booking.getTotalPrice();
	}
	
	public List<Booking> getAllBookingDetails(){
		return bookingRepository.findAll();
	}
	
	public void updateBookingDetail(Booking booking) {
		bookingRepository.save(booking);
	}
	
	public void deleteRoom(int bookingId) {
		bookingRepository.deleteById(bookingId);
	}
	
	public void addPaymentDetail(int bookingId,Payment payment) {
		Booking booking = bookingRepository.findById(bookingId).get();
		booking.setPaymentStatus(payment.isPaymentStatus());
		booking.setPaymentMode(payment.getPaymentMode());
		if(booking.isPaymentStatus() == true) {
			booking.setBookingStatus("Booked");
		}
//		if(booking.getBookingStatus()=="Booked") {
//			finalBookingConfirmation(booking.getGuestId(), booking);
//		}
		finalBookingConfirmation(booking.getGuestId(), booking);
		updateBookingDetail(booking);		
	}
	
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
	
	public Booking getBookingDetailByRoomIdAndCheckInDate(String roomId, Date checkInDate) {
		return bookingRepository.findByRoomIdAndCheckInDate(roomId, checkInDate);
	}

}
