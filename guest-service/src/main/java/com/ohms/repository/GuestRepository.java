package com.ohms.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ohms.model.Guest;

@Repository
public interface GuestRepository extends MongoRepository<Guest, Integer> {
	
//	@Query("{'Guest.guestEmailId':?0}")
	Guest findByGuestEmailId(String guestEmailId); 

}
