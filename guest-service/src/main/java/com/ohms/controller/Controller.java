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

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;


/**
 * This is the controller class of Guest service Which is created for REST API
 *
 */

@RestController
@RequestMapping("/guest")
public class Controller {
	
	@Autowired
	private GuestService guestService;
	
	@PostMapping("/add")
	@Operation(summary = "To add new Guest into Guest Database")
	public String addGuest(@RequestBody Guest guest) {
		guestService.addGuest(guest);
		return "Guset added with Guest Id : " + guest.getGuestId();
	}
	
	@GetMapping("/get")
	@Operation(summary = "Return all the Guest Details in the form of list")
	public List<Guest> getAllguest(){
		return guestService.getAllGuests();
	}
	
	@GetMapping("/get/{id}")
	@Operation(summary = "Return Guest Detail for requested id")
	public Optional<Guest> getGuestById(@PathVariable int id) {
		return guestService.getGuestById(id);
	}
	
	@GetMapping("/getByEmail/{emailId}")
	@Operation(summary = "Return Guest Detail for requested Email Id")
	public Guest getGuestByEmailId(@PathVariable String emailId) {
		return guestService.getGuestByEmailId(emailId);
	}
	
	@PutMapping("/update")
	@Operation(summary = "Update Guest Detail for requested Id")
	public String updateGuest(@RequestBody Guest guest) {
		this.guestService.updateGuest(guest);
		return "Guest updated with guestId ";
	}
	
	@DeleteMapping("/delete/{id}")
	@Operation(summary = "Delete Guest Detail for requested Id")
	public String deleteGuest(@PathVariable int id) {
		this.guestService.deleteGuest(id);
		return "Guest deleted with guestId"+id;
	}
	
	@GetMapping("/getemailid/{guestId}")
	public String getEmailID(@PathVariable int guestId) {
		return guestService.getEmailID(guestId);
	}

}
