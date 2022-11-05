import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  user = { displayName: "" };
  sideBarOpen = true;

  ngOnInit(): void {
    this.auth.blockDashboard();
    if (!this.auth.isAuthenticated()) {
      this.auth.getUserDetails().subscribe({
        next: data => {
          this.user.displayName = data.users[0].displayName;
        }
      })
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
