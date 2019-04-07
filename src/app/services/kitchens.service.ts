import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, PUBLIC_URL } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService} from '../services/auth.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json'})
// };
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+localStorage.getItem("_token")
  })
};

@Injectable({
  providedIn: 'root'
})
export class KitchensService {

  public kitchen:any;

  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     return of(result as T);
    };
  }
 
  getAll() {
    let url = API_URL+"/kitchens";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(kitchens => console.log('fetch kitchens')),
      catchError(this.handleError('getKitchens', []))
    );
  }

  createKitchen(data) {
    let url = API_URL+"/kitchens/store";
    return this.http.post(url, data, httpOptions);
  }

  getKitchen(id) {
    let url = API_URL+"/kitchens/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateKitchen(id, data) {
    let url = API_URL+"/kitchens/"+id+"/update";
    return this.http.post(url, data, httpOptions);
  }

  deleteKitchen(id) {
    console.log(id);
    let url = API_URL+"/kitchens/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }

  getKitchenOrders() {
    let authUser:any = this.auth.user();
    let url:any = "";
    if(authUser.role == 5) {
      url = API_URL+"/kitchen-orders/kitchen-view";
    }else if(authUser.role == 4) {
      url = API_URL+"/kitchen-orders/waiter-view";
    }else {
      url = API_URL+"/kitchen-orders/normal-view";
    }
    
    return this.http.get(url, httpOptions);
  }

  updateKitchenStatus(id) {
    let url = API_URL+"/kitchen-orders/"+id+"/kitchen-ready";
    return this.http.get(url, httpOptions);
  }

  updateWaiterStatus(id) {
    let url = API_URL+"/kitchen-orders/"+id+"/waiter-confirm";
    return this.http.get(url, httpOptions);
  }
  
}
