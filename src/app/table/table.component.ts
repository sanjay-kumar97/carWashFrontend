import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private route: Router) { }

  userId = 'efgh';
  isAdmin = true;
  ngOnInit(): void {
  }

  triggerAlert() {
    Swal.fire({
      text: 'Your Booking has been added successfully!',
      icon: 'success',
      showCancelButton: true,
      cancelButtonText: 'View Bookings',
      confirmButtonText: 'Add another Booking',
      cancelButtonColor: 'Green',
      focusConfirm: false
    }).then((willDelete) => {
      if (willDelete) {
        Swal.fire({
          text: 'Poof! Your imaginary file has been deleted!',
          icon: 'success'
        });
      } else {
        Swal.fire("Your imaginary file is safe!");
      }
    });
  }
  triggerMode() {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: 'View Bookings',
      confirmButtonText: 'Add another Booking',
      cancelButtonColor: 'Green'
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your imaginary file has been deleted!", "success");
        } else {
          console.log('Nope');
        }
      })
  }
}
