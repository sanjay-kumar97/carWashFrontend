import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private auth: AuthenticationService) { }

  user = { displayName: "" };

  head: string = sessionStorage.getItem('validator') == 'true' ? 'Admin' : 'User';

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

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logoutFromApp() {
    this.auth.removeTheTokenFromBrowser();
    this.auth.AfterLogOutMoveToHome();
  }
}
