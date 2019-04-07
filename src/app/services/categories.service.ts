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
export class CategoriesService {
  private categories:any;
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }

  getAll() {
    let url = API_URL+"/categories";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(categories => console.log('fetch categories')),
      catchError(this.handleError('getCategories', []))
    );
  }

  createCategory(data) {
    let url = API_URL+"/categories/store";
    return this.http.post(url, data, httpOptions);
  }

  getCategory(id) {
    let url = API_URL+"/categories/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateCategory(id, data) {
    let url = API_URL+"/categories/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteCategory(id) {
    console.log(id);
    let url = API_URL+"/categories/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }
}
