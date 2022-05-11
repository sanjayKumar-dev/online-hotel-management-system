import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-componet',
  templateUrl: './test-componet.component.html',
  styleUrls: ['./test-componet.component.css']
})
export class TestComponetComponent implements OnInit {

  guestName = "Sanjay";
  NoOfNights = 10;
  address = "Mau, UP, India";
  checkInDate = new Date().toDateString();
  checkOutDate = new Date().toDateString();
  roomId = "A001";
  paymentMode = "Cash";

  constructor() { }

  ngOnInit(): void {
  }

}
