package com.ohms.serice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Booking;
import com.ohms.repository.BookingRepository;

@Service
public class BookingService {
	
	@Autowired
	private BookingRepository bookingRepository;
	
	public void addBookingDetail(Booking booking) {
		bookingRepository.save(booking);
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

}
