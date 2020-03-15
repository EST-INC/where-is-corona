import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  private baseUrl;
  private response;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.$BACKEND_URL + '/actuator/info';
  }

  wakeMeUp() {
    setInterval(() => this.wakeUpMaps(), 180000);
  }
  private wakeUpMaps() {
    this.http.get<string>(this.baseUrl).subscribe(data => this.response = data);
  }
}
