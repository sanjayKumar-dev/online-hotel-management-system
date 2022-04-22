package com.ohms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Room;
import com.ohms.repository.RoomRepository;

@Service
public class RoomService {
	
	@Autowired
	private RoomRepository roomRepository;
	
	public void addRoom(Room room) {
		roomRepository.save(room);
	}
	
	public List<Room> getAllRoom(){
		return roomRepository.findAll();
	}
	
	public Optional<Room> getRoomById(int roomId) {
		return roomRepository.findById(roomId);
	}
	
	public void updateRoom(int roomId, Room room) {
		roomRepository.save(room);
	}
	
	public void deleteRoom(int roomId) {
		roomRepository.deleteById(roomId);
	}
	
	public List<Room> getRoomByStatus(boolean status){
		return roomRepository.findByStatus(status);
	}
}
