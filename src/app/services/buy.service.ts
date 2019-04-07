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
export class BuyService {
  public items:any = [];

  constructor(
    private http:HttpClient
  ) { 
    this.items = localStorage.getItem("buy_cart") ? JSON.parse(localStorage.getItem("buy_cart")) : [];
  }

  getSelf() {
    return this;
  }

  getItemIDs(){
    let ids = [];

    this.items.forEach ( item => {
      let id = item.id;
      let qty = item.qty;
      let orderItemId = item.orderItemId;
      ids.push({product_id:id, qty:qty, orderItemId:orderItemId});
    });

    return ids;
  }

  getItems() {
    return this.items;
  }

  getTotalAmount() {
    let total = 0;
    this.items.forEach(item => {
      total += (item.qty * item.purchase_price);
    });

    return total;
  }

  getTotalCount() {
    return this.items.length;
  }

  save(){
    localStorage.setItem("buy_cart", JSON.stringify(this.items));
  }

  add(item:any){
    //Check if there are existing item in a cart
    if(this.items.length > 0) {
      //if the same item is in the cart
      let existingItemIndex = null;
      this.items.map((cItem,i)=>{
        if(item.id == cItem.id){
          existingItemIndex = i;
        }
      });
      //if same item already in cart
      if(existingItemIndex != null){
        this.items[existingItemIndex].qty += 1;
      }else{
        item.qty = 1;
        this.items.push(item);
      }
    }else{
      //if there are no existing item
      item.qty = 1;
      this.items.push(item);
    }
    //persist to localStorage
    this.save();
    return;
  }

  returnAdd(item:any){
    this.items.push(item);
    //persist to localStorage
    this.save();
    return;
  }

  update(item, mode) {
    let indexToUpdate = null;
    this.items.map((currentItem, index)=>{
      if(currentItem.id == item.id) {
        indexToUpdate = index;
      }
    });

    //Check for mode: m->minus, p->plus
    if(mode == "m") {
      this.items[indexToUpdate].qty -= 1;
    }else if(mode == "p") {
      this.items[indexToUpdate].qty += 1;
    }

    //Check if the qty is 0 or not
    if(this.items[indexToUpdate].qty <= 0) {
      this.items.splice(indexToUpdate, 1);
    }
    //persist to localStorage
    this.save();
    return;
  }

  updateQty(item, qty) {
    let indexToUpdate = null;
    this.items.map((currentItem, index)=>{
      if(currentItem.id == item.id) {
        indexToUpdate = index;
      }
    });

    //Check for mode: m->minus, p->plus
    this.items[indexToUpdate].qty = qty;

    //Check if the qty is 0 or not
    if(this.items[indexToUpdate].qty <= 0) {
      this.items.splice(indexToUpdate, 1);
    }
    //persist to localStorage
    this.save();
    return;
  }

  remove(item:any) {
    let indexToDelete = null;
    this.items.map((currentItem, index)=>{
      if(currentItem.id == item.id) {
        indexToDelete = index;
      }
    });

    if(indexToDelete != null) {
      this.items.splice(indexToDelete, 1);
    }
    //persist to localstorage
    this.save();
    return;
  }

  clear() {
    this.items = [];
    this.save();
  }

  submitPurchase(purchaseData) {
    let url = API_URL+"/purchases/store";
    return this.http.post(url, purchaseData, httpOptions);
  }

  getAllPurchases() {
    let url = API_URL+"/purchases";
    return this.http.get(url, httpOptions);
  }

  getPurchaseDetail(id) {
    let url = API_URL+"/purchases/"+id+"/detail";
    return this.http.get(url, httpOptions);
  }
  
  // getPurchase(id) {
  //   let url = API_URL+"/purchases/"+id;
  //   return this.http.get(url, httpOptions);
  // }

  // updatePurchase(id, purchaseData) {
  //   let url = API_URL+"/purchases/"+id+"/update";
  //   return this.http.post(url, purchaseData, httpOptions);
  // }
}
