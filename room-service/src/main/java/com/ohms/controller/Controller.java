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

@RestController
@RequestMapping("/room")
public class Controller {
	
	@Autowired
	private RoomService roomService;
	
	@PostMapping("/add")
	public String addRoom(@RequestBody Room room) {
		roomService.addRoom(room);
		return "Room Added Successfully";
	}
	
	@GetMapping("/get")
	public List<Room> getAllRoom(){
		return roomService.getAllRoom();
	}
	
	@GetMapping("/get/{roomId}")
	public Optional<Room> getRoomById(@PathVariable int roomId) {
		return roomService.getRoomById(roomId);
	}
	
	@PutMapping("/update/{roomId}")
	public String updateRoom(@PathVariable int roomId, @RequestBody Room room) {
		roomService.updateRoom(roomId, room);
		return "Update Successfully";
	}
	
	@DeleteMapping("/delete/{roomId}")
	public String deleteRoom(@PathVariable int roomId) {
		roomService.deleteRoom(roomId);
		return "Deleted Successfully";
	}
	
	@GetMapping("/getbystatus/{status}")
	public List<Room> getRoomByStatus(@PathVariable boolean status){
		return roomService.getRoomByStatus(status);
	}

}
