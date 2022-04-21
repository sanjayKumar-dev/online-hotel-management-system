package com.ohms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Guest;
import com.ohms.repository.GuestRepository;

@Service
public class GuestService {
	
	@Autowired
	private GuestRepository guestRepository;

	public void addGuest(Guest guest) {
		guestRepository.save(guest);
	}
	
	public List<Guest> getAllGuest() {
		return guestRepository.findAll();
	}
	
	public java.util.Optional<Guest> getGuestById(int guestId) {
		return guestRepository.findById(guestId);
	}
	
	public Guest getGuestByEmailId(String emailId) {
		return guestRepository.findByGuestEmailId(emailId);
	}
	
	public void updateGuest(long guestId, Guest guest) {
		guestRepository.save(guest);
	}

	public void deleteGuest(int guestId) {
		guestRepository.deleteById(guestId);
	}
}
