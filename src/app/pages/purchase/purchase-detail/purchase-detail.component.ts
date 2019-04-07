import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { AuthService} from '../../../services/auth.service';
import { BuyService } from '../../../services/buy.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {

  public purchase:any;
  public purchaseItem:any;
  public url:any;
  public id:any;

  constructor(
    public prodSvc: ProductsService,
    public router: Router,
    public auth: AuthService,
    public buySvc: BuyService,
  ) { 
    this.purchase = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.buySvc.getPurchaseDetail(this.id).subscribe((res:any)=> {
      if(res.purchase) {
        this.purchase = res.purchase;
        this.purchaseItem = res.purchaseItem;
      }
    });
  }

}
