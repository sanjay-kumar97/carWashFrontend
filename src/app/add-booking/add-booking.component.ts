import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  disabledOptions: Array<string> = [''];

  selectedDate: string = '';
  selectedTime: string = '';
  dateFromJson: any;

  UserID = sessionStorage.getItem('UID');

  UserSubmitData = { name: "", model: "", service: "", location: "", date: "", time: "", phone: "", status: "Pending", userID: '' };
  isValid = false;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
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
    console.log('from here :/', this.places);
    this.getDates();
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
      console.log('from here :|', this.places);
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
      Swal.fire({
        text: 'Your Booking has been added successfully!',
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'View Bookings',
        confirmButtonText: 'Add another Booking',
        cancelButtonColor: 'Green'
        // buttons: ['Okay', 'No']
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          this.route.navigate(['/userdashboard/viewbooking']);
        }
      });
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
    this.addUserData(this.UserSubmitData, this.UserSubmitData.userID);

    var dates: { [k: string]: string[] } = this.dateFromJson;
    if (!Object.keys(dates).includes(this.selectedDate)) {
      dates[this.selectedDate] = [];
      console.log('Nope');
    }
    dates[this.selectedDate].push(this.selectedTime.toString());
    console.log('Date', dates);

    this.postDate(dates);
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

  addUserData(data: any, uid: string) {
    this.api.postUserData(data, uid)
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
          this.places = res;
          console.log('From here', this.places);
        },
        error: () => {
          console.log('From places', 'Error!');
        }
      });

    this.api.getService()
      .subscribe({
        next: (res) => {
          console.log('From Services', res);
          this.services = res;
          console.log(this.services);
        },
        error: () => {
          console.log('From places', 'Error!');
        }
      });
  }

  postDate(date: any) {
    this.api.postDate(date)
      .subscribe({
        next: (data) => {
          console.log('Success =>', data);
        },
        error: () => {
          console.log('Err');
        }
      });
  }

  getDates() {
    this.api.getDates()
      .subscribe({
        next: (res) => {
          this.dateFromJson = res;
          console.log('Success =>', res);
        },
        error: () => {
          console.log('Err');
        }
      });
  }

  setDate() {
    this.selectedDate = 'date_' + this.timeDetails.value.date.toLocaleDateString().replaceAll('/', '');
    this.disabledOptions = [''];
    for (let i = 0; i < 5; i++) {
      if (this.dateFromJson[this.selectedDate][i]) {
        this.disabledOptions.push(this.dateFromJson[this.selectedDate][i]);
        // console.log('Yes');
      }
      console.log(this.dateFromJson[this.selectedDate][i]);
    }
  }

  setTime() {
    this.selectedTime = this.timeDetails.value.time;
  }
}