package com.ohms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Room;
import com.ohms.repository.RoomRepository;

/**
 * This Class contains the business logics for the Room service.
 *
 */
@Service
public class RoomService {
	
	@Autowired
	private RoomRepository roomRepository;
	
	public void addRoom(Room room) {
		roomRepository.save(room);
	}
	
	public List<Room> getAllRooms(){
		return roomRepository.findAll();
	}
	
	public Optional<Room> getRoomById(String roomId) {
		return roomRepository.findById(roomId);
	}
	
	public void updateRoom(Room room) {
		roomRepository.save(room);
	}
	
	public void deleteRoom(String roomId) {
		roomRepository.deleteById(roomId);
	}
	
	public List<Room> getRoomsByStatus(boolean status){
		return roomRepository.findByStatus(status);
	}
	
	//This function takes roomId as input and return the room price for requested roomId
	public double getRoomPrice(String roomId) {
		//for storing the room
		Room room = null; 
		
		//findById return Optional<Room> 
		Optional<Room> roomCheck = roomRepository.findById(roomId); 
		if(roomCheck != null) {
			room = (Room) roomCheck.get();
		}
		return room.getPrice();
	}
}
