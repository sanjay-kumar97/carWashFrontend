import { trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'model', 'service', 'location'];
  dataSource!: MatTableDataSource<any>;
  options = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5'];
  disabledOptions = ['Slot 3', 'Slot 5'];
  butDisabled = false;
  // dateVal = new FormControl('');
  // car: { id: string, name: string } = {
  //   id: "1",
  //   name: "Corolla"
  // };
  cars = { id: '1', name: 'hello' };
  counters: number[] = [0, 0, 0, 0, 0];
  iconText: string[] = ['', 'arrow_upward', 'arrow_downward'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: Router, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getBookingData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getBookingData() {
    this.api.getData()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.log('Error');
        }
      });
  }

  changeIcon(id: number) {
    switch (id) {
      case 0:
        if (this.counters[id] < 2) {
          this.counters[id] += 1;
        } else {
          this.counters[id] = 0;
        }
        console.log('From', this.displayedColumns[id], ':', this.counters[id] == 1 ? 'ascending' : this.counters[id] == 2 ? 'descending' : 'normal');
        document.getElementsByTagName('mat-icon')[id].innerHTML = this.iconText[this.counters[id]];
        break;
      case 1:
        if (this.counters[id] < 2) {
          this.counters[id] += 1;
        } else {
          this.counters[id] = 0;
        }
        console.log('From', this.displayedColumns[id], ':', this.counters[id] == 1 ? 'ascending' : this.counters[id] == 2 ? 'descending' : 'normal');
        document.getElementsByTagName('mat-icon')[id].innerHTML = this.iconText[this.counters[id]];
        break;
      case 2:
        if (this.counters[id] < 2) {
          this.counters[id] += 1;
        } else {
          this.counters[id] = 0;
        }
        console.log('From', this.displayedColumns[id], ':', this.counters[id] == 1 ? 'ascending' : this.counters[id] == 2 ? 'descending' : 'normal');
        document.getElementsByTagName('mat-icon')[id].innerHTML = this.iconText[this.counters[id]];
        break;
      case 3:
        if (this.counters[id] < 2) {
          this.counters[id] += 1;
        } else {
          this.counters[id] = 0;
        }
        console.log('From', this.displayedColumns[id], ':', this.counters[id] == 1 ? 'ascending' : this.counters[id] == 2 ? 'descending' : 'normal');
        document.getElementsByTagName('mat-icon')[id].innerHTML = this.iconText[this.counters[id]];
        break;
      case 4:
        if (this.counters[id] < 2) {
          this.counters[id] += 1;
        } else {
          this.counters[id] = 0;
        }
        console.log('From', this.displayedColumns[id], ':', this.counters[id] == 1 ? 'ascending' : this.counters[id] == 2 ? 'descending' : 'normal');
        document.getElementsByTagName('mat-icon')[id].innerHTML = this.iconText[this.counters[id]];
        break;
    }
  }
  onBtnClick() {
    let dates = { "date_1": ['Slot 1', 'Slot 2', 'Slot 5'], "date_2": ['Slot 3', 'Slot 4'] };
    dates
    this.api.postDate(dates)
      .subscribe({
        next: (res) => {
          console.log('Success =>', res);
        },
        error: () => {
          console.log('Err');
        }
      });
    // this.api.getDates()
    //   .subscribe({
    //     next: (res) => {
    //       console.log('Success =>', res);
    //     },
    //     error: () => {
    //       console.log('Err');
    //     }
    //   });
  }
}
//   userId = 'efgh';
//   isAdmin = true;
//   ngOnInit(): void {
//   }

//   triggerAlert() {
//     Swal.fire({
//       text: 'Your Booking has been added successfully!',
//       icon: 'success',
//       showCancelButton: true,
//       cancelButtonText: 'View Bookings',
//       confirmButtonText: 'Add another Booking',
//       cancelButtonColor: 'Green',
//       focusConfirm: false
//     }).then((willDelete) => {
//       if (willDelete) {
//         Swal.fire({
//           text: 'Poof! Your imaginary file has been deleted!',
//           icon: 'success'
//         });
//       } else {
//         Swal.fire("Your imaginary file is safe!");
//       }
//     });
//   }
//   triggerMode() {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Are you sure that you want to delete this file?",
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonText: 'View Bookings',
//       confirmButtonText: 'Add another Booking',
//       cancelButtonColor: 'Green'
//     })
//       .then((result) => {
//         if (result.isConfirmed) {
//           Swal.fire("Deleted!", "Your imaginary file has been deleted!", "success");
//         } else {
//           console.log('Nope');
//         }
//       })
//   }
// }
