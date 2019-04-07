import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders:any;

  constructor(
    public cartSvc: CartService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loadOrder();

    setInterval(() => { 
      this.loadOrder();
    }, 1000);
  }

  loadOrder() {
    this.cartSvc.getOrder().subscribe((res:any)=> {
      if(res.orders) {
        this.orders = res.orders;
      }
    });
  }

  openOrder(id) {
    this.cartSvc.clear();
    this.router.navigate(["/sales/order/"+id]);
  }

}
