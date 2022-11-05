import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  moveToLogin() {
    this.route.navigate(['login']);
  }

  moveToRegister() {
    this.route.navigate(['register']);
  }
}
