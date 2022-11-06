import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post<any>("http://localhost:3000/bookingData/", data);
  }

  getData() {
    return this.http.get<any>("http://localhost:3000/bookingData/");
  }

  updateData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/bookingData/" + id, data);
  }

  deleteData(id: number) {
    return this.http.delete<any>("http://localhost:3000/bookingData/" + id);
  }

  postPlace(data: any) {
    return this.http.post<any>("http://localhost:3000/locationData/", data);
  }

  getPlace() {
    return this.http.get<any>("http://localhost:3000/locationData/");
  }

  updatePlace(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/locationData/" + id, data);
  }

  deletePlace(id: number) {
    return this.http.delete<any>("http://localhost:3000/locationData/" + id);
  }

  postService(data: any) {
    return this.http.post<any>("http://localhost:3000/serviceData/", data);
  }

  getService() {
    return this.http.get<any>("http://localhost:3000/serviceData/");
  }

  updateService(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/serviceData/" + id, data);
  }

  deleteService(id: number) {
    return this.http.delete<any>("http://localhost:3000/serviceData/" + id);
  }

}