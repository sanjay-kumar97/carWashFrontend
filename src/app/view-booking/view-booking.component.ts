import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'model', 'service', 'location', 'date', 'time', 'phone', 'status'];
  dataSource!: MatTableDataSource<any>;
  dataFromJson: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) { }

  bookingData: Array<any> = [];
  UserId: any;
  isAdmin!: boolean;

  ngOnInit(): void {
    this.getBookingData();
    this.UserId = sessionStorage.getItem('UID');
    this.checkAdmin();
    this.isAdmin = sessionStorage.getItem('Validator') == 'true' ? true : false;
    console.log('User ID:', this.UserId);
  }

  checkAdmin() {
    this.isAdmin = sessionStorage.getItem('Validator') == 'true' ? true : false;
    if (this.isAdmin) {
      this.displayedColumns = ['id', 'name', 'model', 'service', 'location', 'date', 'time', 'phone', 'status', 'action'];
    }
  }
  getBookingData() {
    this.api.getData()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataFromJson = res;
          // this.filterBasedOnUser();
          this.dataSource = new MatTableDataSource(this.dataFromJson);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.log('Error');
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveStatus(data: any) {
    console.log('Approved');
    data.status = 'Approved';
    console.log('After Update', data);
    this.updateStatus(data);
  }

  rejectStatus(data: any) {
    console.log('Rejected');
    data.status = 'Rejected';
    console.log('After Update', data);
    this.updateStatus(data);
  }

  updateStatus(data: any) {
    this.api.updateData(data, data.id)
      .subscribe({
        next: (res) => {
          console.log('Status Updated');
        },
        error: () => {
          console.log('Error in Updating Status');
        }
      })
  }

  filterBasedOnUser() {
    console.log('Before', this.dataFromJson);
    for (let i = 0; i < this.dataFromJson.length; i++) {
      let x = (this.dataFromJson[i].userID).toString();
      if (x == this.UserId) {
        console.log(x, 'true');
      } else {
        delete this.dataFromJson[i];
      }
    }
    console.log('After', this.dataFromJson);

  }

}
