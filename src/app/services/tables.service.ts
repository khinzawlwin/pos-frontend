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
export class TablesService {

  constructor(public http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/tables";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(tables => console.log('fetch tables')),
      catchError(this.handleError('getTables', []))
    );
  }

  createTable(data) {
    let url = API_URL+"/tables/store";
    return this.http.post(url, data, httpOptions);
  }

  getTable(id) {
    let url = API_URL+"/tables/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateTable(id, data) {
    let url = API_URL+"/tables/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteTable(id) {
    console.log(id);
    let url = API_URL+"/tables/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }
}
