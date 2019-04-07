import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, PUBLIC_URL } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem("_token")
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/users";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(users => console.log('fetch users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  createUser(data) {
    let url = API_URL+"/users/store";
    return this.http.post(url, data, httpOptions);
  }

  getUser(id) {
    let url = API_URL+"/users/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateUser(id, data) {
    let url = API_URL+"/users/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteUser(id) {
    console.log(id);
    let url = API_URL+"/users/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }

  getRole() {
    let url = API_URL+"/users/roles";
    return this.http.get(url, httpOptions);
  }

}
