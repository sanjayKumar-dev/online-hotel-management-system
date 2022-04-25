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

import com.ohms.model.Room;
import com.ohms.service.RoomService;

import io.swagger.v3.oas.annotations.Operation;

/**
 * This is the controller class of Room service Which is created for REST API
 *
 */

@RestController
@RequestMapping("/room")
public class Controller {
	
	@Autowired
	private RoomService roomService;
	
	@PostMapping("/add")
	@Operation(summary = "To add new Room into Room Database")
	public String addRoom(@RequestBody Room room) {
		roomService.addRoom(room);
		return "Room Added Successfully";
	}
	
	@GetMapping("/get")
	@Operation(summary = "Return all the Room Details in the form of list")
	public List<Room> getAllRooms(){
		return roomService.getAllRooms();
	}
	
	@GetMapping("/get/{roomId}")
	@Operation(summary = "Return Room Detail for requested id")
	public Optional<Room> getRoomById(@PathVariable String roomId) {
		return roomService.getRoomById(roomId);
	}
	
	@PutMapping("/update")
	@Operation(summary = "Update Room Detail for requested Id")
	public String updateRoom(@RequestBody Room room) {
		roomService.updateRoom(room);
		return "Update Successfully";
	}
	
	@DeleteMapping("/delete/{roomId}")
	@Operation(summary = "Delete Room Detail for requested Id")
	public String deleteRoom(@PathVariable String roomId) {
		roomService.deleteRoom(roomId);
		return "Deleted Successfully";
	}
	
	@GetMapping("/getbystatus/{status}")
	@Operation(summary = "Return all the Room Details which have selected status in the form of list")
	public List<Room> getRoomsByStatus(@PathVariable boolean status){
		return roomService.getRoomsByStatus(status);
	}

}
