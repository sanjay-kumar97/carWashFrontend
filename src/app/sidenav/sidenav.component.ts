import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAdmin: boolean = sessionStorage.getItem('validator') == 'true' ? true : false;
  constructor() { }

  ngOnInit(): void {
  }

}
