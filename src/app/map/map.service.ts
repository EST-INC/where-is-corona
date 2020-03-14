import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MapModel } from './map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private baseUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.$BACKEND_URL + '/api/infection';
  }

  getMapInformation() {
    return this.http.get<MapModel>(this.baseUrl);
  }
}
