import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {

  newPlace: string = '';
  displayedColumns: string[] = ['id', 'place'];
  dataSource!: MatTableDataSource<any>;
  constructor() { }

  ngOnInit(): void {

  }

  addPlace() {
    console.log(this.newPlace);
  }
}
