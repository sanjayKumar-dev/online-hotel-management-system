import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/service/inventory.service';
// import { ValidationService } from 'app/validation.service';

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
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productId: 0,
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+")]],
      productCategory: ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', [Validators.required, Validators.min(0)]]
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
            this.toastr.success("Product Added Successfully", "Sucess", {
              timeOut: 1000
            });
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            console.log(err);
            this.toastr.error("Error while Adding Product", "Error", {
              timeOut: 2000
            });            
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
        this.toastr.success("Product Detail Updated Successfully", "Sucess", {
          timeOut: 1000
        });
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error while Updating Detail", "Error", {
          timeOut: 2000
        });       
      }
    })
  }

}
