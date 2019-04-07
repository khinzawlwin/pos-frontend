import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, PUBLIC_URL } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DemandsService {

  constructor(public http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/customer-demands";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(kitchens => console.log('fetch kitchens')),
      catchError(this.handleError('getKitchens', []))
    );
  }

  createDemand(data) {
    let url = API_URL+"/customer-demands/store";
    return this.http.post(url, data, httpOptions);
  }

  getDemand(id) {
    let url = API_URL+"/customer-demands/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateDemand(id, data) {
    let url = API_URL+"/customer-demands/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteDemand(id) {
    let url = API_URL+"/customer-demands/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }
}
