import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'userdashboard',
    component: UserDashboardComponent,
    children: [
      { path: '', redirectTo: 'addbooking', pathMatch: 'full' },
      { path: 'addbooking', component: AddBookingComponent },
      { path: 'viewbooking', component: ViewBookingComponent }
    ]
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'addplace', pathMatch: 'full' },
      { path: 'addplace', component: AddPlaceComponent },
      { path: 'addservice', component: AddServiceComponent },
      { path: 'viewbooking', component: ViewBookingComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
