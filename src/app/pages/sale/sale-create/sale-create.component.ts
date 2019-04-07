import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { TablesService } from '../../../services/tables.service';
import { AuthService} from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { KitchensService } from '../../../services/kitchens.service';
import { DemandsService } from '../../../services/demands.service';

@Component({
  selector: 'app-sale-create',
  templateUrl: './sale-create.component.html',
  styleUrls: ['./sale-create.component.css']
})
export class SaleCreateComponent implements OnInit {
  public categories:any;
  public products:any;
  public tables:any;
  public order:any = {};
  public orders:any;
  public pending:any;
  public vId:any;
  public ordersCount:any;
  public pendingCount:any;
  public readyCount:any;
  public demands:any;
  public setdemand:any;
  public userRole:any;
  public taxCheck:boolean = false;
  public isCheckTax:boolean;

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
    public catSvc: CategoriesService,
    public kitSvc: KitchensService,
    public dmSvc: DemandsService,
  ) { 
    this.setdemand = {
      itemid: '',
      demand: '',
      remark: ''
    };
    this.order.discount_amount = 0;
    this.order.table_id = 0;
    this.order.customer_id = 1;
  }

  ngOnInit() {
    this.userRole = this.auth.user();
    $(document).ready(function(){
      $("body.skin-blue").addClass("sidebar-collapse");
    });
    
    this.cartSvc.clear();
    this.loadProducts();

    this.catSvc.getAll().subscribe((res:any)=> {
      if(res.categories) {
        this.categories = res.categories;
      }
    });

    this.tblSvc.getAll().subscribe((res:any)=>{
      if(res.tables) {
        this.tables = res.tables;
      }
    });

    this.updateValue();
    this.getOrderCount();
    this.getPendingCount();
    this.getVId();
    this.kitchenReady();
    this.getDemand();

    setInterval(() => { 
    this.kitchenReady(); 
    this.getOrderCount();
    }, 1000);
    
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

  updateValue() {
    if(this.taxCheck == false) {
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
    this.kitchenReady();
    this.cartSvc.clear();
    this.order.discount_amount = 0;
    this.order.tax = 0;
    this.order.total_amount = 0;
    this.order.paid_amount = 0;
    this.order.change_amount = 0;
    this.order.balance_amount = 0;
    this.order.table_id = 0;
    this.order.customer_id = 1;
  }

  removeItemCart(item) {
    // console.log(item);
    this.cartSvc.remove(item);
    this.updateValue();
  }

  getOrderCount() {
    this.cartSvc.getOrder().subscribe((res:any)=> {
      if(res.orders) {
        this.orders = res.orders;
        this.ordersCount = res.orders.length;
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
    let authUser:any = this.auth.user();

    if(this.order.table_id > 0) {
      let formData = {
        customer_id: this.order.customer_id,
        table_id: this.order.table_id,
        voucher_no: this.vId,
        subtotal: this.cartSvc.getTotalAmount(),
        discount_amount: this.order.discount_amount,
        tax: this.order.tax,
        total_amount: this.order.total_amount,
        paid_amount: this.order.paid_amount,
        change_amount: this.order.change_amount,
        balance_amount: this.order.balance_amount,
        sale_by: authUser.id,
        status: s,
        items: this.cartSvc.getItemIDs()
      };
  
      // console.log(formData);
      this.cartSvc.submitOrder(formData).subscribe((res:any)=> {
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
          this.kitchenReady();
          this.getVId();
          //redirect to pos
          this.router.navigate(["/sales/create"]);
        }
      });
    }else {
      alert('Please Select Table!');
    }
    
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
    this.router.navigate(["/sales/order/"+id]);
    $(document).ready(function(){
      $("div.modal-backdrop").remove();
      $("body").removeClass("modal-open");
      
    });
  }

  openPending(id) {
    this.router.navigate(["/sales/order/"+id]);
    $(document).ready(function(){
      $("div.modal-backdrop").remove();
      $("body").removeClass("modal-open");
      
    });
  }

  kitchenReady() {
    this.kitSvc.getKitchenOrders().subscribe((res:any)=> {
      if(res.kitchenOrders) {
        this.readyCount = res.kitchenOrders.length;
      }
    });
  }

  getVId() {
    this.cartSvc.getMyOrders().subscribe((res:any)=> {
      if(res.orders) {
        let num = res.orders.length + 1;
        this.vId = String("00000000" + num).slice(-8);
        console.log(this.vId);
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

}
