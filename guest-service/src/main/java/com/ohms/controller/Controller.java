package com.ohms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ohms.model.Guest;
import com.ohms.service.GuestService;


@RestController
@RequestMapping("/guest")
public class Controller {
	
	@Autowired
	private GuestService guestService;
	
	@PostMapping("/add")
	public String addGuest(@RequestBody Guest guest) {
		guestService.addGuest(guest);
		return "Guset added with Guest Id : " + guest.getGuestId();
	}
	
	@GetMapping("/get")
	public List<Guest> getAllguest(){
		return guestService.getAllGuest();
	}
	
	@GetMapping("/get/{id}")
	public Optional<Guest> getGuestById(@PathVariable int id) {
		return guestService.getGuestById(id);
	}
	
	@GetMapping("/getByEmail/{emailId}")
	public Guest getGuestByEmailId(@PathVariable String emailId) {
		return guestService.getGuestByEmailId(emailId);
	}
	
	@PutMapping("/update/{id}")
	public String updateGuest(@RequestBody Guest guest,@PathVariable long id) {
		this.guestService.updateGuest(id, guest);
		return "Guest updated with guestId "+id;
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteGuest(@PathVariable int id) {
		this.guestService.deleteGuest(id);
		return "Guest deleted with guestId"+id;
	}

}
