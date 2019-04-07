import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductsService } from '../../../services/products.service';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { TablesService } from '../../../services/tables.service';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService} from '../../../services/auth.service';
import {formatDate } from '@angular/common';
import { AppComponent } from '../../../app.component';
import { CategoriesService } from '../../../services/categories.service';
import { KitchensService } from '../../../services/kitchens.service';
import { DemandsService } from '../../../services/demands.service';

declare var window:any;
declare var Date:any;

@Component({
  selector: 'app-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.css']
})
export class SaleOrderComponent implements OnInit {
  public categories:any;
  public products:any;
  public tables:any;
  public order:any;
  public items:any;
  public cust_demands: any;
  public countItem:any;
  public orders:any;
  public pending:any;
  public vId:any;
  public url:any;
  public id:any;
  public ordersCount:any;
  public pendingCount:any;
  public today = new Date();
  public jstoday:any;
  public readyCount:any;
  public userRole:any;
  public demands:any;
  public setdemand:any;
  public custName: any;
  public tblName: any;
  public taxCheck:boolean = false;
  public isCheckTax:boolean;
  public orderService:any;
  public chkByOne:boolean = false;
  public chkItemValue:any = {};
  public byOne:boolean = false;

  public title:any;
  public query:any = {
    q: '',
    code: '',
    category: ''
  };

  constructor(
    public prodSvc: ProductsService,
    public cartSvc: CartService,
    public tblSvc: TablesService,
    public router: Router,
    public auth: AuthService,
    public app: AppComponent,
    public catSvc: CategoriesService,
    public kitSvc: KitchensService,
    public dmSvc: DemandsService,

  ) { 
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
    this.order = {};
    this.setdemand = {
      itemid: '',
      demand: '',
      remark: '',
      kitchen_status: '',
    };

    // override the route reuse strategy
     this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }

     this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
     });

     this.chkItemValue = localStorage.getItem("checkItem") ? JSON.parse(localStorage.getItem("checkItem")) : [];

  }

  ngOnInit() {
    this.userRole = this.auth.user();
    $(document).ready(function(){
      $("body.skin-blue").addClass("sidebar-collapse");
    });

    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en');

    this.catSvc.getAll().subscribe((res:any)=> {
      if(res.categories) {
        this.categories = res.categories;
      }
    });

    this.loadProducts();
    this.getSaleOrders(this.id);

    this.tblSvc.getAll().subscribe((res:any)=>{
      if(res.tables) {
        this.tables = res.tables;
      }
    });

    this.getOrderCount();
    this.getPendingCount();

    this.cartSvc.getMyOrders().subscribe((res:any)=> {
      if(res.orders) {
        let num = res.orders.length + 1;
        this.vId = String("00000000" + num).slice(-8);
      }
    });

    this.kitchenReady();
    this.getDemand();
    console.log(this.cartSvc.getItems());
  }

  loadProducts() {
    this.products = [];
    this.prodSvc.getAllPOS(this.query).subscribe((data:any)=>{
      // console.log(data.products);
      if(data.products) {
        this.products = data.products;
      }
    });
  }

  onFilter() {
    this.loadProducts();
    this.query.q = '';
    this.query.code = '';
  }

  getSaleOrders(id:any) {
    this.cartSvc.getSaleOrder(id).subscribe((res:any)=> {
      if(res.order) {
        this.order = res.order;
        this.custName = res.order.Customer.name;
        this.tblName = res.order.Table.name;
        this.items = res.items;
        this.cust_demands = res.cust_demands;
        this.countItem = res.countItem;
        this.orderService = res.cust_demands.length;
        // console.log(this.orderService);

        if(this.cartSvc.getItems().length < this.countItem) {
          this.items.map((item, i)=> {
            let addItem = item.Product;
            addItem.qty = item.qty;
            addItem.orderItemId = item.id;
            this.cartSvc.returnAdd(addItem);
          });

          this.cust_demands.map((setdemand, i)=> {
            this.setdemand.itemid = setdemand.sale_item_id;
            this.setdemand.demand = setdemand.cust_demand;
            this.setdemand.remark = setdemand.remark;
            this.setdemand.kitchen_status = setdemand.kitchen_status;
            this.cartSvc.returnAddDemand(this.setdemand);
          });
        }

        this.order.total_amount = this.cartSvc.getTotalAmount();
        this.order.paid_amount = this.cartSvc.getTotalAmount();
        this.order.balance_amount = this.cartSvc.getTotalAmount();

        if(this.order.remark == 'byOne') {
          this.byOne = true;
          this.chkByOne = true;
        }

        if(this.order.tax == 0 || this.order.tax == null) {
          this.taxCheck = false;
          this.isCheckTax = false;
        }else {
          this.taxCheck = true;
          this.isCheckTax = true;
        }
      }
    });
  }

  updateValue() {
    if(this.isCheckTax == false) {
      this.order.tax = 0;
      this.order.total_amount = this.cartSvc.getTotalAmount();
      this.order.paid_amount = this.cartSvc.getTotalAmount();
      this.order.change_amount = 0;
      this.order.balance_amount = this.cartSvc.getTotalAmount();
    }else {
      this.order.tax = this.cartSvc.getTax();
      this.order.total_amount = this.cartSvc.getTotalAmount() +  this.cartSvc.getTax();
      this.order.paid_amount = this.cartSvc.getTotalAmount() +  this.cartSvc.getTax();
      this.order.change_amount = 0;
      this.order.balance_amount = this.cartSvc.getTotalAmount() +  this.cartSvc.getTax();
    }
  }

  addToCart(product) {
    // console.log(product);
    this.cartSvc.add(product);

    this.updateValue();

  }

  updateQtyCart(item, mode) {
    this.cartSvc.update(item, mode);

    this.updateValue();
  }

  reset() {
    this.cartSvc.clear();
    this.order.discount_amount = 0;
    this.order.tax = 0;
    this.order.total_amount = 0;
    this.order.paid_amount = 0;
    this.order.change_amount = 0;
    this.order.balance_amount = 0;
    this.order.table_id = 0;
    this.order.customer_id = 1;

    //redirect to sales create
    this.router.navigate(["/sales/create"]);
  }

  removeItemCart(item) {
    console.log(item);
    this.cartSvc.remove(item);
    this.cartSvc.removeOrderItem(item.orderItemId).subscribe((res:any)=> {
      if(res.orderItem) {
        console.log(res.message);
      }
    });
    this.updateValue();
  }

  getOrderCount() {
    this.cartSvc.getOrder().subscribe((res:any)=> {
      // console.log(res.orders);
      if(res.orders) {
        this.orders = res.orders;
        this.ordersCount = res.orders.length;
        console.log(this.orders);
      }
    });
  }

  getPendingCount() {
    this.cartSvc.getPending().subscribe((res:any)=> {
      if(res.orders) {
        this.pending = res.orders;
        this.pendingCount = res.orders.length;
      }
    });
  }

  onOrderSubmit(s) {
    console.log(this.getChkItem());

    let id = this.order.id;
    let formData = {};
    if(this.chkByOne == false) {
      
        formData = {
        customer_id: this.order.customer_id,
        table_id: this.order.table_id,
        // voucher_no: this.vId,
        subtotal: this.cartSvc.getTotalAmount(),
        discount_amount: this.order.discount_amount,
        tax: this.order.tax,
        total_amount: this.order.total_amount,
        paid_amount: this.order.paid_amount,
        change_amount: this.order.change_amount,
        balance_amount: this.order.balance_amount,
        status: s,
        items: this.cartSvc.getItemIDs(),
      };
    }else {
      
      formData = {
        by_one: 'byOne',
        table_id: this.order.table_id,
        item_id: this.getChkItemIDs(),
        status: s,
      };
    }
    this.cartSvc.updateOrder(id, formData).subscribe((res:any)=> {
      console.log(res)
      if(res.order) {
        //clear shopping cart
        this.cartSvc.clear();

        this.order.discount_amount = 0;
        this.order.tax = 0;
        this.order.total_amount = 0;
        this.order.paid_amount = 0;
        this.order.change_amount = 0;
        this.order.balance_amount = 0;
        this.order.table_id = 0;
        this.order.customer_id = 1;

        this.getOrderCount();
        this.getPendingCount();
        // Check By One
        this.chkItemValue = [];
        this.save();
        this.byOne = false;
        this.chkByOne = false;
        
        this.router.navigate(["/sales/create"]);
      }
    });
    
  }

  discountCal() {
    let discount = (this.cartSvc.getTotalAmount()*this.order.discount_amount)/100;
    if(this.taxCheck == false) {
      var tax = 0;
    }else {
      var tax = (this.cartSvc.getTotalAmount() - discount) * 0.05;
    }
    this.order.tax = Math.round(tax);
    this.order.total_amount = Math.round((this.cartSvc.getTotalAmount() - discount) + tax);
    this.order.paid_amount =  Math.round((this.cartSvc.getTotalAmount() - discount) + tax);
    this.order.balance_amount =  Math.round((this.cartSvc.getTotalAmount() - discount) + tax);
  }

  paidamountCal() {
    this.order.change_amount = this.order.paid_amount - this.order.total_amount;
    this.order.balance_amount = this.order.paid_amount - this.order.change_amount;
  }

  changeamountCal() {
    this.order.balance_amount = this.order.paid_amount - this.order.change_amount;
  }

  taxOnOff(value: any) {
    this.taxCheck = value.currentTarget.checked;
    
    let discount = (this.cartSvc.getTotalAmount()*this.order.discount_amount)/100;
    if(this.taxCheck == true) {
      var tax = (this.cartSvc.getTotalAmount() - discount) * 0.05;
    }else {
      var tax = 0;  
    }
    this.order.tax = Math.round(tax);
    this.order.total_amount = Math.round((this.cartSvc.getTotalAmount() - discount) + tax);
    this.order.paid_amount =  Math.round((this.cartSvc.getTotalAmount() - discount) + tax);
    this.order.balance_amount =  Math.round((this.cartSvc.getTotalAmount() - discount) + tax);
  }

  openOrder(id) {
    this.cartSvc.clear();
    this.getSaleOrders(id);
    this.getOrderCount();
    this.getPendingCount();
    // window.location="/sales/order/"+id;
    $(document).ready(function(){
      $("div.modal-backdrop").remove();
      $("body").removeClass("modal-open");
      $("#openOrder.modal").removeClass("in");
      // $("#openOrder.modal").addClass("out");
      $("#openOrder.modal").css({"display": "none"});
      $("body").css({"padding-right":0});
    });
    this.router.navigate(["/sales/order/"+id]);
  }

  openPending(id) {
    this.cartSvc.clear();
    this.getSaleOrders(id);
    this.getOrderCount();
    this.getPendingCount();
    // window.location="/sales/order/"+id;
    $(document).ready(function(){
      $("div.modal-backdrop").remove();
      $("body").removeClass("modal-open");
      $("#openPending.modal").removeClass("in");
      // $("#openPending.modal").addClass("out");
      $("#openPending.modal").css({"display":"none","padding-right": 0});
      $("body").css({"padding-right":0});
    });
    this.router.navigate(["/sales/order/"+id]);
  }

  printVoucher(cmpName) {
    let printContents, popupWin;
    printContents = document.getElementById(cmpName).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  kitchenReady() {
    this.kitSvc.getKitchenOrders().subscribe((res:any)=> {
      if(res.kitchenOrders) {
        this.readyCount = res.kitchenOrders.length;
      }
    });
  }

  getDemand() {
    this.dmSvc.getAll().subscribe((res:any)=> {
      if(res.demands) {
        this.demands = res.demands;
      }
    });
  }

  getId(id, demand, remark) {
    this.setdemand.itemid = id;
    if(demand == null) {
      this.setdemand.demand = "";
    } else {
      this.setdemand.demand = demand;
    }
    if(remark == null) {
      this.setdemand.remark = "";
    } else {
      this.setdemand.remark = remark;
    }
  }

  getCustDemand(setdemand) {
    this.cartSvc.addDemand(setdemand);
  }

  getByOne(value:any) {
    this.chkByOne = value.currentTarget.checked;
    if(this.chkByOne == false) {
      this.chkItemValue = [];
    }
  }

  chkItem(event:any, item:any) {
    let chk = event.currentTarget.checked;
    if(chk == true) {
      this.chkItemValue.push(item);

    }else {

      let indexToDelete = null;
      this.chkItemValue.map((currentItem, index)=>{
        if(currentItem.id == item.id) {
          indexToDelete = index;
        }
      });
  
      if(indexToDelete != null) {
        this.chkItemValue.splice(indexToDelete, 1);
      }  
    }

    this.save();
    return;
  }

  save(){
    localStorage.setItem("checkItem", JSON.stringify(this.chkItemValue));
  }

  getChkItem() {
    return this.chkItemValue;
  }

  getChkItemIDs(){
    let ids = [];

    this.chkItemValue.forEach ( item => {
      let orderItemId = item.orderItemId;
      ids.push({orderItemId:orderItemId});
    });

    return ids;
  }

}
