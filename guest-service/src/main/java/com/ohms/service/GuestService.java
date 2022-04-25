package com.ohms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Guest;
import com.ohms.repository.GuestRepository;

/**
 * This Class contains the business logics for the guest service.
 *
 */

@Service
public class GuestService {
	
	@Autowired
	private GuestRepository guestRepository;

	public void addGuest(Guest guest) {
		guestRepository.save(guest);
	}
	
	public List<Guest> getAllGuests() {
		return guestRepository.findAll();
	}
	
	public Optional<Guest> getGuestById(int guestId) {
		return guestRepository.findById(guestId);
	}
	
	public Guest getGuestByEmailId(String emailId) {
		return guestRepository.findByGuestEmailId(emailId);
	}
	
	public void updateGuest(Guest guest) {
		guestRepository.save(guest);
	}

	public void deleteGuest(int guestId) {
		guestRepository.deleteById(guestId);
	}
}
