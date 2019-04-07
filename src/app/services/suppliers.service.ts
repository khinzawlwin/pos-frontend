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
export class SuppliersService {

  constructor(public http: HttpClient) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/suppliers";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(tables => console.log('fetch suppliers')),
      catchError(this.handleError('getSuppliers', []))
    );
  }

  createSupplier(data) {
    console.log("process");
    let url = API_URL+"/suppliers/store";
    return this.http.post(url, data, httpOptions);
  }

  getSupplier(id) {
    let url = API_URL+"/suppliers/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateSupplier(id, data) {
    let url = API_URL+"/suppliers/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteSupplier(id) {
    console.log(id);
    let url = API_URL+"/suppliers/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }

}
