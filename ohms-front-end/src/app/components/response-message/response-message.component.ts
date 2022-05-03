import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.css']
})
export class ResponseMessageComponent implements OnInit {

  public messsage;
  constructor(private router: Router) {
    this.messsage = this.router.getCurrentNavigation()?.extras.state?.['mes'];
   }

  ngOnInit(): void {
  }

  
}
