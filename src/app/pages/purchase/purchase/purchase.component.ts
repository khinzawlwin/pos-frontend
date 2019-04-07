import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { AuthService} from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';
import { BuyService } from '../../../services/buy.service';
import { SuppliersService } from '../../../services/suppliers.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public stocks:any;
  public categories:any;
  public query:any = {
    q: '',
    code: '',
    category: ''
  };
  public purchase:any = {};
  public suppliers:any;

  constructor(
    public prodSvc: ProductsService,
    public router: Router,
    public auth: AuthService,
    public catSvc: CategoriesService,
    public buySvc: BuyService,
    public supplierSvc: SuppliersService,
  ) { 
    this.purchase.supplier_id = 0;
  }

  ngOnInit() {
    $(document).ready(function(){
      $("body.skin-blue").addClass("sidebar-collapse");
    });
    this.buySvc.clear();
    this.loadStocks();
    this.loadCategories();
    this.loadSuppliers();
    this.loadPurchaseCount();
  }

  loadStocks() {
    this.stocks = [];
    this.prodSvc.getBuyStock(this.query).subscribe((data:any)=>{
      if(data.stocks) {
        this.stocks = data.stocks;
      }
    });
  }

  loadCategories() {
    this.catSvc.getAll().subscribe((res:any)=> {
      if(res.categories) {
        this.categories = res.categories;
      }
    });
  }

  loadSuppliers() {
    this.supplierSvc.getAll().subscribe((res:any)=> {
      if(res.suppliers) {
        this.suppliers = res.suppliers;
      }
    });
  }

  loadPurchaseCount() {
    this.buySvc.getAllPurchases().subscribe((res:any)=> {
      if(res.purchases) {
        this.purchase.purchase_no = res.purchases.length + 1;
      }
    });
  }

  onFilter() {
    this.loadStocks();
    this.query.q = '';
    this.query.code = '';
  }

  addToCart(stock) {
    this.buySvc.add(stock);
  }

  updateQtyCart(item, mode) {
    this.buySvc.update(item, mode);
  }

  updateQty(item, qty) {
    this.buySvc.updateQty(item, qty);
  }

  reset() {
    this.buySvc.clear();
    this.purchase.supplier_id = 0;
  }

  removeItemCart(item) {
    // console.log(item);
    this.buySvc.remove(item);
  }

  onPurchaseSubmit() {
    let authUser:any = this.auth.user();
    if(this.purchase.supplier_id > 0) {
      let formData = {
        purchase_no: this.purchase.purchase_no,
        supplier_id: this.purchase.supplier_id,
        grand_total: this.buySvc.getTotalAmount(),
        purchase_by: authUser.id,
        items: this.buySvc.getItemIDs()
      };
  
      // console.log(formData);
      this.buySvc.submitPurchase(formData).subscribe((res:any)=> {
        console.log(res)
        if(res.purchase) {
          //clear shopping cart
          this.buySvc.clear();
          this.purchase.supplier_id = 0;
  
          //redirect to pos
          this.router.navigate(["/purchases"]);
        }
      });
    }else {
      alert('Please Select Supplier!');
    }
  }

}
