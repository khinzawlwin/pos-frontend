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
export class SalesService {

  constructor(
    public http: HttpClient
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/sales";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(sales => console.log('fetch sales')),
      catchError(this.handleError('getSales', []))
    );
  }

  createSale(data) {
    let url = API_URL+"/sales/store";
    return this.http.post(url, data, httpOptions);
  }

  getSale(id) {
    let url = API_URL+"/sales/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateSale(id, data) {
    let url = API_URL+"/sales/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteSale(id) {
    console.log(id);
    let url = API_URL+"/sales/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }

}
