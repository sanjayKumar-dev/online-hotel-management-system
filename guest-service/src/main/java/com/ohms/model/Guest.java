package com.ohms.model;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Guest")
public class Guest {
	@Id
	private int guestId;
	
	@NotNull(message="Guest Name cannnot be null")
	private String guestName;
	
	@NotNull(message="Guest Age cannnot be null")
	private int guestAge;
	
	@NotNull(message="Guest Contact Number cannnot be null")
	@Size(min = 10, message = "Contact Number Cannot be less than 10 digits")
	@Size(max = 10, message = "Contact Number Cannot be more than 10 digits")
	private long guestContactNumber;
	
	@NotNull(message="Guest Email Id cannnot be null")
	private String guestEmailId;
	
	@NotNull(message="Guest Address cannnot be null")
	private String guestAddress;
	
	
	
	public int getGuestId() {
		return guestId;
	}
	public void setGuestId(int guestId) {
		this.guestId = guestId;
	}
	public String getGuestName() {
		return guestName;
	}
	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}
	public int getGuestAge() {
		return guestAge;
	}
	public void setGuestAge(int guestAge) {
		this.guestAge = guestAge;
	}
	public long getGuestContactNumber() {
		return guestContactNumber;
	}
	public void setGuestContactNumber(long guestContactNumber) {
		this.guestContactNumber = guestContactNumber;
	}
	public String getGuestEmailId() {
		return guestEmailId;
	}
	public void setGuestEmailId(String guestEmailId) {
		this.guestEmailId = guestEmailId;
	}
	public String getGuestAddress() {
		return guestAddress;
	}
	public void setGuestAddress(String guestAddress) {
		this.guestAddress = guestAddress;
	}
	public Guest(int guestId, String guestName, int guestAge, long guestContactNumber, String guestEmailId,
			String guestAddress) {
		super();
		this.guestId = guestId;
		this.guestName = guestName;
		this.guestAge = guestAge;
		this.guestContactNumber = guestContactNumber;
		this.guestEmailId = guestEmailId;
		this.guestAddress = guestAddress;
	}
	public Guest() {
		super();
		// TODO Auto-generated constructor stub
	}	
	
	

}
