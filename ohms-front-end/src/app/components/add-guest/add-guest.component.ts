import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AddGuestService } from 'src/app/service/add-guest.service';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css']
})
export class AddGuestComponent implements OnInit {

  guest ={
    guestId: '',
    guestName: '',
    guestAge: '',
    guestContactNumber: '',
    guestEmailId: '',
    guestAddress: ''
  }
  constructor(private addGuestService: AddGuestService) { }

  ngOnInit(): void {
  }
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  addGuestDetail(){
    // console.log(this.guest);
    this.addGuestService.addGuest(this.guest);
  }
}
