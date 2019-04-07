import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { API_URL, PUBLIC_URL } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  serialize(obj) {
    var str= [];
    for (var p in obj) {
     if(obj.hasOwnProperty(p)) {
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
     }
    }
    return str.join("&");
  }

  getSalesTotal(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/reports/sales-total?"+qstr;
    return this.http.get(url, httpOptions);
  }

  getSalesReport(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/reports/sales-report?"+qstr;
    return this.http.get(url, httpOptions);
  }

  getSalesDetail(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/reports/sales-detail?"+qstr;
    return this.http.get(url, httpOptions);
  }

  getSalesQty(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/reports/sales-qty?"+qstr;
    return this.http.get(url, httpOptions);
  }

  getSalesAllQty(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/reports/product-qty?"+qstr;
    return this.http.get(url, httpOptions);
  }

  getAllStocks() {
    let url = API_URL+"/reports/stock-qty";
    return this.http.get(url, httpOptions);
  }

}
