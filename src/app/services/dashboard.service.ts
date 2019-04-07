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
export class DashboardService {

  constructor(public http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getStocks() {
    let url = API_URL+"/dashboard/stocks";
    return this.http.get(url, httpOptions);
  }

  getTopProducts() {
    let url = API_URL+"/dashboard/top-products";
    return this.http.get(url, httpOptions);
  }
  
  getSaleTotals() {
    let url = API_URL+"/dashboard/sales-total";
    return this.http.get(url, httpOptions);
  }

  getRegisterUsers() {
    let url = API_URL+"/dashboard/register-user";
    return this.http.get(url, httpOptions);
  }

}
