import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { API_URL, PUBLIC_URL } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products:any;
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

  getAllPOS(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/products/pos?"+qstr;
    return this.http.get(url, httpOptions)
    .pipe(
      tap(products => console.log('fetch products')),
      catchError(this.handleError('getproducts', []))
    );
  }

  getBuyStock(query={}) {
    let qstr = this.serialize(query);
    let url = API_URL+"/products/buy?"+qstr;
    return this.http.get(url, httpOptions)
    .pipe(
      tap(products => console.log('fetch products')),
      catchError(this.handleError('getproducts', []))
    );
  }

  getAll() {
    let url = API_URL+"/products";
    return this.http.get(url, httpOptions)
    .pipe(
      tap(products => console.log('fetch products')),
      catchError(this.handleError('getproducts', []))
    );
  }

  createProduct(data) {
    console.log(data);
    let formdata = new FormData();
    if(data.thumbnail != undefined) {
      formdata.append('thumbnail', data.thumbnail, data.thumbnail.name);  
    }
    formdata.append('name', data.name);
    formdata.append('category_id', data.category_id);
    formdata.append('kitchen_id', data.kitchen_id);
    formdata.append('counting_unit', data.counting_unit);
    formdata.append('price', data.price);
    formdata.append('purchase_price', data.purchase_price);
    formdata.append('qty_opening_balance', data.qty_opening_balance);
    formdata.append('qty_warehouse', data.qty_warehouse);
    formdata.append('qty_counter', data.qty_counter);
    formdata.append('code', data.code);
    formdata.append('discount_amount', data.discount_amount);
    if(data.is_active == true){
      data.is_active = 1;
      formdata.append('is_active', data.is_active);
    }else {
      data.is_active = 0;
      formdata.append('is_active', data.is_active);
    }
    if(data.is_raw == true){
      data.is_raw = 1;
      formdata.append('is_raw', data.is_raw);
    }else {
      data.is_raw = 0;
      formdata.append('is_raw', data.is_raw);
    }
    
    formdata.append('description', data.description);
    formdata.append('created_by', data.created_by);

    let url = API_URL+"/products/store";
    return this.http.post(url, formdata, httpOptions);
  }

  getProduct(id) {
    let url = API_URL+"/products/"+id+"/edit";
    return this.http.get(url, httpOptions);
  }

  updateProduct(id, data) {
    // console.log(data);
    let formdata = new FormData();
    if(data.thumbnail != undefined) {
      formdata.append('thumbnail', data.thumbnail, data.thumbnail.name);  
    }
    formdata.append('name', data.name);
    formdata.append('category_id', data.category_id);
    formdata.append('kitchen_id', data.kitchen_id);
    formdata.append('counting_unit', data.counting_unit);
    formdata.append('price', data.price);
    formdata.append('purchase_price', data.purchase_price);
    formdata.append('qty_opening_balance', data.qty_opening_balance);
    formdata.append('qty_warehouse', data.qty_warehouse);
    formdata.append('qty_counter', data.qty_counter);
    formdata.append('code', data.code);
    formdata.append('discount_amount', data.discount_amount);
    if(data.is_active == true){
      data.is_active = 1;
      formdata.append('is_active', data.is_active);
    }else {
      data.is_active = 0;
      formdata.append('is_active', data.is_active);
    }
    if(data.is_raw == true){
      data.is_raw = 1;
      formdata.append('is_raw', data.is_raw);
    }else {
      data.is_raw = 0;
      formdata.append('is_raw', data.is_raw);
    }
    formdata.append('description', data.description);

    let url = API_URL+"/products/"+id+"/update";
    return this.http.post(url, formdata, httpOptions);
  }

  deleteProduct(id) {
    console.log(id);
    let url = API_URL+"/products/"+id+"/delete";
    return this.http.get(url, httpOptions);
  }

  getImg(img_name) {
    return PUBLIC_URL+"uploads/"+img_name;
  }

}
