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
export class CustomersService {

  constructor(public http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/customers";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(customers => console.log('fetch customers')),
      catchError(this.handleError('getCustomers', []))
    );
  }

  createCustomer(data) {
    let url = API_URL+"/customers/store";
    return this.http.post(url, data, httpOptions);
  }

  getCustomer(id) {
    let url = API_URL+"/customers/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateCustomer(id, data) {
    let url = API_URL+"/customers/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteCustomer(id) {
    console.log(id);
    let url = API_URL+"/customers/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }

}
