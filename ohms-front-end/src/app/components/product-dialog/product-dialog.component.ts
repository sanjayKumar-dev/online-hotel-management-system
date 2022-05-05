import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  guestForm !: FormGroup;
  actionBtn = 'Save';
  constructor() { }

  ngOnInit(): void {
  }

  addProduct(){
    
  }

}
