import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { InventoryService } from 'src/app/service/inventory.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {


  displayedColumns: string[] = ['productId', 'productName', 'productCategory', 'quantity', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: InventoryService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  // For Opening Dialog Box
  openDialog(){
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'sava'){
        this.getAllProduct();
      }
      this.getAllProduct();
    });
  }

  getAllProduct(){
    this.api.getProduct().subscribe({
      next: (result)=>{
        console.log(result);
        
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        alert("Error While Featching Inventory Data!!");
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProduct();
      }
    })
  }

  deleteProduct(id: number){

    this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you Want to Delete This Product?'
    }).afterClosed().subscribe(val=>{
      if(val === 'confirm'){
        
        this.api.deleteProduct(id).subscribe({
          next: (result)=>{
            alert("Deleted Successfully");
            this.getAllProduct();
          },
          error: ()=>{
            alert("Error While Deleting");
          }
        })
        
      }
    })
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
