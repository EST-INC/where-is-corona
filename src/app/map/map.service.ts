import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MapModel } from './map.model';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private baseUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.$BACKEND_URL + '/api/infection';
  }

  getMapInformation() {
    return this.http.get<MapModel[]>(this.baseUrl).pipe(retry(1), catchError(this.errorHandl));
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
