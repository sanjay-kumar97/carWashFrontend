import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

  displayedColumns: string[] = ['id', 'name', 'model', 'service', 'location', 'date', 'time', 'phone', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cookieService: CookieService, private api: ApiService) { }

  bookingData: Array<any> = [];

  ngOnInit(): void {
    let cookie_data = this.cookieService.get("data").split("|");
    for (let i = 0; i < cookie_data.length; i++) {
      cookie_data[i] = JSON.parse(cookie_data[i]);
    }
    // $scopes.cookie_data = cookie_data;
    this.bookingData = cookie_data;
    this.getAllData();
  }

  getAllData() {
    this.api.getData()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
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

}
