import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { OwnerComponent } from './components/owner/owner.component';
import { OwnerSidenavComponent } from './components/owner-sidenav/owner-sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { AddGuestComponent } from './components/add-guest/add-guest.component';
import { BookingComponent } from './components/booking/booking.component';
import { ResponseMessageComponent } from './components/response-message/response-message.component';
import {MatStepperModule} from '@angular/material/stepper';
import { GuestCurdComponent } from './components/guest-curd/guest-curd.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { GuestDialogComponent } from './components/guest-dialog/guest-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component';
import { RoomBookComponent } from './components/room-book/room-book.component';
import { RoomBookDialogComponent } from './components/room-book-dialog/room-book-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingOperationComponent } from './components/booking-operation/booking-operation.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';

import { ToastrModule } from 'ngx-toastr';
import { RoomComponent } from './components/room/room.component';
import { RoomDialogComponent } from './components/room-dialog/room-dialog.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ManagerSidenavComponent } from './components/manager-sidenav/manager-sidenav.component';
import { ReceptionComponent } from './components/reception/reception.component';
import { ReceptionSidenavComponent } from './components/reception-sidenav/reception-sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponetComponent } from './components/test-componet/test-componet.component';
import { DateDialogComponent } from './components/date-dialog/date-dialog.component';
import { DepartmentReportComponent } from './components/department-report/department-report.component';
import {NgxPrintModule} from 'ngx-print';
import { BookingReportComponent } from './components/booking-report/booking-report.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OwnerComponent,
    OwnerSidenavComponent,
    HeaderComponent,
    AddGuestComponent,
    BookingComponent,
    ResponseMessageComponent,
    GuestCurdComponent,
    GuestDialogComponent,
    InventoryComponent,
    ProductDialogComponent,
    EmployeeComponent,
    EmployeeDialogComponent,
    RoomBookComponent,
    RoomBookDialogComponent,
    BookingOperationComponent,
    ConfirmDialogComponent,
    RoomComponent,
    RoomDialogComponent,
    ManagerComponent,
    ManagerSidenavComponent,
    ReceptionComponent,
    ReceptionSidenavComponent,
    HomeComponent,
    TestComponetComponent,
    DateDialogComponent,
    DepartmentReportComponent,
    BookingReportComponent,
    PaymentDialogComponent,
    AddAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPrintModule,
    MatTableExporterModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
