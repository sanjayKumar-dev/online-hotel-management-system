import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGuestComponent } from './components/add-guest/add-guest.component';
import { BookingOperationComponent } from './components/booking-operation/booking-operation.component';
import { BookingComponent } from './components/booking/booking.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { GuestCurdComponent } from './components/guest-curd/guest-curd.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component';
import { OwnerComponent } from './components/owner/owner.component';
import { ResponseMessageComponent } from './components/response-message/response-message.component';
import { RoomBookComponent } from './components/room-book/room-book.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { 
    path: 'owner', component: OwnerComponent,
    children: [
      { path: 'addguest', component: AddGuestComponent},
      { path: 'booking', component: BookingComponent},
      { path: 'response', component: ResponseMessageComponent},
      {path: 'guest', component: GuestCurdComponent},
      {path: 'inventory', component: InventoryComponent},
      {path: 'employee', component: EmployeeComponent},
      {path: 'roombooking', component: RoomBookComponent},
      {path: 'bookingoperation', component: BookingOperationComponent},
      {path: 'room', component: RoomComponent}
    ]
  },
  {path: 'guestcurd', component: GuestCurdComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'roombooking', component: RoomBookComponent},
  {path: 'bookingoperation', component: BookingOperationComponent},
  {path: 'room', component: RoomComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
