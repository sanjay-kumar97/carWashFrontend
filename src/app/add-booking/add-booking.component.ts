import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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

  UserSubmitData = { name: "", model: "", service: "", location: "", date: "", time: "", phone: "" };
  isValid = false;
  constructor(private formBuilder: FormBuilder) { }

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
      alert("Done!");
    }
  }
  onUserSubmit() {

  }
}
