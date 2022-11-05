import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  adminUID: string = 'XG4glTzOKpMzCofirBAXVWN3LA22';
  constructor(private route: Router, private http: HttpClient) { }
  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') == null) {
      return true;
    } else {
      return false;
    }
  }
  blockDashboard() {
    if (this.isAuthenticated()) {
      this.errorAlertBox();
      this.route.navigate(['login']);
    }
  }
  blockDashboardAndPredicationPage() {
    if (this.isAuthenticated()) {
      this.errorAlertBox();
      this.route.navigate(['login']);
    }
  }
  AfterAccountCreateGoToDashboard() {
    if (!this.isAuthenticated()) {
      this.route.navigate(['userdashboard']);
    }
  }
  AfterAccountCreateGoToDashboardAdmin() {
    if (!this.isAuthenticated()) {
      this.route.navigate(['admindashboard']);
    }
  }

  errorAlertBox() {
    Swal.fire('Oops', 'You must Login first to continue!', 'error');
  }

  newSignUp(name: string, email: string, phonenumber: string, password: string, confirmpassword: string) {
    return this.http.post<{ idToken: string }>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATaIF9CurtUtko0YVk8zL5hV06sTT9W3Y',
      { displayName: name, email, phonenumber, password, confirmpassword });
  }
  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  loginUser(email: string, password: string) {
    return this.http.post<{ idToken: string, localId: string }>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATaIF9CurtUtko0YVk8zL5hV06sTT9W3Y',
      { email, password });
  }

  getUserDetails() {
    let token = sessionStorage.getItem('token');
    return this.http.post<{ users: Array<{ displayName: string }> }>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyATaIF9CurtUtko0YVk8zL5hV06sTT9W3Y',
      { idToken: token });


  }
  AfterLogOutMoveToHome() {
    if (this.isAuthenticated()) {
      this.route.navigate(['Home']);
      Swal.fire(
        'Success!',
        'Logged Out Successfully',
        'success'
      )
    }
  }

  checkAdmin(id: string) {
    if (id == (this.adminUID)) {
      return true;
    }
    return false;
  }

  removeTheTokenFromBrowser() {
    sessionStorage.removeItem('token');
  }
}
