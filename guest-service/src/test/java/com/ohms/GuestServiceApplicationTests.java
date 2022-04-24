package com.ohms;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.ohms.model.Guest;
import com.ohms.repository.GuestRepository;
import com.ohms.service.GuestService;

@SpringBootTest
class GuestServiceApplicationTests {
	
	@Autowired
	private GuestService guestService;
	
	@MockBean
	private GuestRepository guestRepository;

//	@Test
//	void contextLoads() {
//	}
	
	@Test
	public void addGuestTest() {
		Guest guest=new Guest(123, "Abhishek", 21, 700563458, "abhishek123@gmail.com", "Lucknow");
		guestService.addGuest(guest);
		verify(guestRepository,times(1)).save(guest);
	}

}
