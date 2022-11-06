import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  placeData = { placeName: '' };
  displayedColumns: string[] = ['id', 'place', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getPlaceData();
  }

  addPlace() {
    this.api.postPlace(this.placeData)
      .subscribe({
        next: (res) => {
          console.log('From addPlace:', 'Success!');
        },
        error: () => {
          console.log('From addPlace:', "Error");
        }
      })
    window.location.reload();
  }

  getPlaceData() {
    this.api.getPlace()
      .subscribe({
        next: (res) => {
          console.log('From getPlace:', 'Success!', res);
          this.dataSource = new MatTableDataSource(res);
        },
        error: () => {
          console.log('From getPlace:', "Error");
        }
      })
  }

  deletePlace(id: number) {
    this.api.deletePlace(id)
      .subscribe({
        next: (res) => {
          console.log('From deletePlace:', 'Success!');
        },
        error: () => {
          console.log('From dletePlace:', 'Error!');
        }
      })
    window.location.reload();
  }
}
