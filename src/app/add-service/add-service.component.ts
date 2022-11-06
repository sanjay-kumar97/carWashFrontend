import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  serviceData = { serviceName: '' };
  displayedColumns: string[] = ['id', 'service', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getServiceData();
  }

  addService() {
    this.putServiceData(this.serviceData);
    console.log('Added:', this.serviceData.serviceName);
    window.location.reload();
  }

  putServiceData(data: any) {
    this.api.postService(data)
      .subscribe({
        next: (res) => {
          console.log('From addService:', 'Success!');
        },
        error: () => {
          console.log('From addService:', "Error");
        }
      })
  }

  getServiceData() {
    this.api.getService()
      .subscribe({
        next: (res) => {
          console.log('From getService:', 'Success!', res);
          this.dataSource = new MatTableDataSource(res);
        },
        error: () => {
          console.log('From getService:', "Error");
        }
      })
  }

  deleteService(id: number) {
    this.api.deleteService(id)
      .subscribe({
        next: (res) => {
          console.log('From deleteService:', 'Success!');
        },
        error: () => {
          console.log('From dleteService:', 'Error!');
        }
      })
    window.location.reload();
  }
}