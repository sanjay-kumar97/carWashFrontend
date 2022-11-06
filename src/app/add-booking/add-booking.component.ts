import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  userDetails!: FormGroup;
  carDetails!: FormGroup;
  locationDetails!: FormGroup;
  timeDetails!: FormGroup;
  userStep = false;
  carStep = false;
  locationStep = false;
  timeStep = false;
  step = 1;

  places: Array<any> = [];
  slots: Array<string> = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5'];
  services: Array<any> = [];

  UserID = sessionStorage.getItem('UID');

  UserSubmitData = { name: "", model: "", service: "", location: "", date: "", time: "", phone: "", status: "Pending", userID: '' };
  isValid = false;
  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private api: ApiService) { }

  ngOnInit(): void {
    let cookie_place = this.cookieService.get('placeData').split("|");
    this.places = cookie_place;
    console.log(this.places);
    this.userDetails = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.carDetails = this.formBuilder.group({
      model: ['', Validators.required],
      service: ['', Validators.required]
    });
    this.locationDetails = this.formBuilder.group({
      place: ['', Validators.required]
    });
    this.timeDetails = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.getPlacesAndServices();
  }

  get user() {
    return this.userDetails.controls;
  }

  get car() {
    return this.carDetails.controls;
  }

  get location() {
    return this.locationDetails.controls;
  }

  get time() {
    return this.timeDetails.controls;
  }

  next() {
    if (this.step == 1) {
      this.userStep = true;
      if (this.userDetails.invalid) { return; }
      this.step += 1;
    } else if (this.step == 2) {
      this.carStep = true;
      if (this.carDetails.invalid) { return; }
      this.step += 1;
    } else if (this.step == 3) {
      this.timeStep = true;
      if (this.timeDetails.invalid) { return; }
      this.step += 1;
    }
    console.log(this.step);
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.carStep = false;
    }
    if (this.step == 2) {
      this.timeStep = false;
    }
    if (this.step == 3) {
      this.locationStep = false;
    }
  }

  submit() {
    if (this.step == 4) {
      this.locationStep = true;
      if (this.locationDetails.invalid) { return; }
      console.log(this.locationDetails.value.place);
      this.onUserSubmit();
      alert("Done!");
    }
  }
  onUserSubmit() {
    this.UserSubmitData.name = this.userDetails.value.name;
    this.UserSubmitData.phone = this.userDetails.value.phone;
    this.UserSubmitData.model = this.carDetails.value.model;
    this.UserSubmitData.service = this.carDetails.value.service;
    this.UserSubmitData.date = this.timeDetails.value.date.toLocaleDateString();
    this.UserSubmitData.time = this.timeDetails.value.time;
    this.UserSubmitData.location = this.locationDetails.value.place;
    this.UserSubmitData.userID = (this.UserID)?.toString()!;
    console.log(this.UserSubmitData);
    const userData = localStorage.getItem(this.UserID!);
    if (!userData) {
      localStorage.setItem(this.UserID!, JSON.stringify(this.UserSubmitData));
    } else {
      localStorage.setItem(this.UserID!, userData + "|" + JSON.stringify(this.UserSubmitData));
    }
    this.addData(this.UserSubmitData);
  }

  addData(data: any) {
    this.api.postData(data)
      .subscribe({
        next: (res) => {
          console.log('Success!');
        },
        error: () => {
          console.log("Error");
        }
      })
  }

  getPlacesAndServices() {
    this.api.getPlace()
      .subscribe({
        next: (res) => {
          console.log('From Places', res);
        },
        error: () => {
          console.log('From places', 'Error!');
        }
      })

    this.api.getService()
      .subscribe({
        next: (res) => {
          console.log('From Services', res);
        },
        error: () => {
          console.log('From places', 'Error!');
        }
      })
  }
}

