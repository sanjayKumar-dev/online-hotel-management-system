package com.ohms.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ohms.model.Room;

@Repository
public interface RoomRepository extends MongoRepository<Room, Integer> {
	
	List<Room> findByStatus(boolean status);
}
