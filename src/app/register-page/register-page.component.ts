import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private route: Router, private auth: AuthenticationService) { }
  SignUpFormsData = { name: "", email: "", phonenumber: "", password: "", confirmpassword: "" };
  submit = false;
  errorMessage = "";

  ngOnInit(): void {
  }

  moveToLogin() {
    this.route.navigate(['login']);
  }

  onSignup() {
    console.log(this.SignUpFormsData);
    this.auth.newSignUp(this.SignUpFormsData.name, this.SignUpFormsData.email, this.SignUpFormsData.phonenumber, this.SignUpFormsData.password, this.SignUpFormsData.confirmpassword)
      .subscribe({
        next: data => {
          this.auth.storeToken(data.idToken);
          console.log("SIGNUP SUCCESSFUL!!");
          Swal.fire(
            'Success!',
            'Sign up is Successful',
            'success'
          )
          this.auth.AfterAccountCreateGoToDashboard();
        },
        error: data => {
          if (data.error.error.message == "INVALID_EMAIL") {
            Swal.fire('Oops!', 'Check the Email, Email is Invalid', 'error');
          } else if (data.error.error.message == "EMAIL_EXISTS") {
            Swal.fire('Oops!', 'User is already registered, Kindly login', 'error');
            this.route.navigate(['login']);
          } else if (data.error.error.message == "WEAK_PASSWORD : Password should be at least 6 characters") {
            Swal.fire('Oops!', 'Password should be at least 6 characters', 'error');
          }
          else {
            Swal.fire('Oops!', 'Unknown error has occured', 'error');
          }
        }
      }).add(() => {
        console.log("OVERALL CHECK SIGNUP COMPLETED!!");
      });
  }
}