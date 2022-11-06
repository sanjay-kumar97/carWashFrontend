import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private route: Router, private auth: AuthenticationService) { }

  submit = false;
  LogInFormsData = { email: "", password: "" };
  UID: string = '';
  isAdmin: boolean | undefined;
  ngOnInit(): void {
  }

  moveToSignup() {
    this.route.navigate(['register']);
  }
  onLogin() {
    console.log('From Login');
    console.log(this.LogInFormsData);
    this.auth.loginUser(this.LogInFormsData.email, this.LogInFormsData.password).subscribe({
      next: data => {
        this.auth.storeToken(data.idToken);
        this.UID = data.localId.toString();
        console.log("UserId", this.UID);
        sessionStorage.setItem('UID', this.UID);
        console.log('Login Success!');
        Swal.fire(
          'Success!',
          'Login is Successful',
          'success'
        )
        if (!this.auth.checkAdmin(this.UID)) {
          this.isAdmin = false;
          this.auth.AfterAccountCreateGoToDashboard();
        } else {
          this.isAdmin = true;
          this.auth.AfterAccountCreateGoToDashboardAdmin();
        }
        sessionStorage.setItem('validator', this.isAdmin.toString());
      },
      error: data => {
        if (data.error.error.message == "INVALID_PASSWORD") {
          Swal.fire('Oops!', 'Password is wrong, Please check the password once', 'error');
        } else if (data.error.error.message == "EMAIL_NOT_FOUND") {
          Swal.fire('Oops!', 'User not found, Kindly Signup', 'error');
          this.route.navigate(['register']);
        } else {
          Swal.fire('Oops!', 'Unknown error occured', 'error');
        }
      }
    }).add(() => {
      console.log('COMPLETE');
    });
  }
}