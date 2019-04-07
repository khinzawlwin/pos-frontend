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
export class CartService {
  public items:any = [];
  public addItem:any = [];

  constructor(
    private http:HttpClient
  ) { 

    this.items = localStorage.getItem("shopping_cart") ? JSON.parse(localStorage.getItem("shopping_cart")) : [];
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
      let demand = item.demand;
      let remark = item.remark;
      let kitchen_status = item.kitchen_status;
      ids.push({product_id:id, qty:qty, orderItemId:orderItemId, demand:demand, remark:remark, kitchen_status:kitchen_status});
    });

    return ids;
  }

  getItems() {
    return this.items;
  }

  getTotalAmount() {
    let total = 0;
    this.items.forEach(item => {
      total += (item.qty * item.price);
    });

    return total;
  }

  getTotalCount() {
    return this.items.length;
  }

  getTax() {
    let tax = 0;
    let total = this.getTotalAmount();
    if(total > 0) {
      tax = total * 0.05;
    }

    return tax;
  }

  save(){
    localStorage.setItem("shopping_cart", JSON.stringify(this.items));

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

  addDemand(setdemand:any) {
      //if the same item is in the cart
      let existingItemIndex = null;
      this.items.map((cItem,i)=>{
        if(setdemand.itemid == cItem.id){
          this.items[i].demand = setdemand.demand;
          this.items[i].remark = setdemand.remark;
        }
      });

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

  returnAddDemand(setdemand:any) {
    //if the same item is in the cart
    let existingItemIndex = null;
    this.items.map((cItem,i)=>{
      if(setdemand.itemid == cItem.orderItemId){
        this.items[i].demand = setdemand.demand;
        this.items[i].remark = setdemand.remark;
        this.items[i].kitchen_status = setdemand.kitchen_status;
      }
    });
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

  removeOrderItem(itemId) {
    let url = API_URL+"/orders/"+itemId+"/removeitem";
    return this.http.get(url, httpOptions);
  }

  clear() {
    this.items = [];
    this.save();
  }

  submitOrder(orderData) {
    let url = API_URL+"/orders";
    return this.http.post(url, orderData, httpOptions);
  }

  getOrder() {
    let url = API_URL+"/orders/order";
    return this.http.get(url, httpOptions);
  }

  getPending() {
    let url = API_URL+"/orders/pending";
    return this.http.get(url, httpOptions);
  }

  getMyOrders() {
    let url = API_URL+"/orders";
    return this.http.get(url, httpOptions);
  }
  
  getSaleOrder(id) {
    let url = API_URL+"/orders/"+id;
    return this.http.get(url, httpOptions);
  }

  updateOrder(id, orderData) {
    let url = API_URL+"/orders/"+id+"/update";
    return this.http.post(url, orderData, httpOptions);
  }

}
