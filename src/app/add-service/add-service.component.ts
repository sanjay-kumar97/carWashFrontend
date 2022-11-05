import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  newService: string = "";
  services: Array<any> = [];
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    let cookie_service = this.cookieService.get('serviceData').split("|");
    this.services = cookie_service;
    console.log(this.services);
  }

  addService() {
    const service_data = this.cookieService.get('serviceData');
    if (!service_data) {
      this.cookieService.set('serviceData', (this.newService).toString());
    } else {
      this.cookieService.set('serviceData', service_data + "|" + (this.newService).toString());
    }
    console.log(this.cookieService.get('serviceData'));
    window.location.reload();
  }
}
