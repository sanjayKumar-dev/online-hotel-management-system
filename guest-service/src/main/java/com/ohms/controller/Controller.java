package com.ohms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ohms.model.Guest;
import com.ohms.model.GuestResponse;
import com.ohms.service.GuestService;

import io.swagger.v3.oas.annotations.Operation;


/**
 * This is the controller class of Guest service Which is created for REST API
 *
 */

@RestController
@RequestMapping("/guest")
@CrossOrigin("*")
public class Controller {
	
	@Autowired
	private GuestService guestService;
	
	@PostMapping("/add")
	@Operation(summary = "To add new Guest into Guest Database")
	public ResponseEntity<?> addGuest(@RequestBody Guest guest) {
		
		//Check if guest detail is already existed by id
		
		if(guestService.isExistedById(guest.getGuestId())) {
			Guest guestVar = guestService.getGuestById(guest.getGuestId()).get();
			return ResponseEntity.ok(new GuestResponse("Guest Already Exist", guestVar.getGuestId(), guestVar.getGuestEmailId()));
		}
		
		// To check if guest detail is already existed by emialId
		
		else if(guestService.isExistedByEmailId(guest.getGuestEmailId())) {
			Guest guestVar = guestService.getGuestByEmailId(guest.getGuestEmailId());
			return ResponseEntity.ok(new GuestResponse("Guest Already Exist", guestVar.getGuestId(), guestVar.getGuestEmailId()));
		}else {
			guestService.addGuest(guest);
			return ResponseEntity.ok(new GuestResponse("Guest Detail Add successfully", guest.getGuestId(), guest.getGuestEmailId()));
		}
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
