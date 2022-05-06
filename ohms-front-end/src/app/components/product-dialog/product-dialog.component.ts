import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from 'src/app/service/inventory.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn = 'Save';
  constructor(private formBuilder: FormBuilder,
    private api: InventoryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<ProductDialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productId: 0,
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['productId'].setValue(this.editData.productId);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next: (result)=>{
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            console.log(err);
            alert("Error While adding Product!!");            
          }
        })
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.updateProduct(this.productForm.value).subscribe({
      next: (result)=>{
        alert("Updated Details");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        console.log(err);
        alert("Error while updating product detail!!");        
      }
    })
  }

}
