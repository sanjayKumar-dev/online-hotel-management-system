import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGuestComponent } from './components/add-guest/add-guest.component';
import { BookingComponent } from './components/booking/booking.component';
import { GuestCurdComponent } from './components/guest-curd/guest-curd.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component';
import { OwnerComponent } from './components/owner/owner.component';
import { ResponseMessageComponent } from './components/response-message/response-message.component';

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
      {path: 'inventory', component: InventoryComponent}
    ]
  },
  {path: 'guestcurd', component: GuestCurdComponent},
  {path: 'inventory', component: InventoryComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
