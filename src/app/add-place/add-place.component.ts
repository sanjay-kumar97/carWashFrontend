import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  newPlace = { placeName: "" };
  places: Array<any> = [];
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    let cookie_place = this.cookieService.get('placeData').split("|");
    this.places = cookie_place;
    console.log(this.places);
  }

  addPlace() {
    const place_data = this.cookieService.get('placeData');
    if (!place_data) {
      this.cookieService.set('placeData', (this.newPlace.placeName).toString());
    } else {
      this.cookieService.set('placeData', place_data + "|" + (this.newPlace.placeName).toString());
    }
    console.log(this.cookieService.get('placeData'));
    window.location.reload();
  }
}
