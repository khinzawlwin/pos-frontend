import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../../services/auth.service';
import { BuyService } from '../../../services/buy.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  
  public purchases:any;
  public p:any;
  public userRole:any;

  constructor(
    public router: Router,
    public auth: AuthService,
    public buySvc: BuyService,
  ) { }

  ngOnInit() {
    this.userRole = this.auth.user();
    if(this.userRole.role == 4 || this.userRole.role == 5) {
      this.router.navigate(["/sales/create"]);
    }
    
    this.p = 1;
    this.loadPurchase();
  }

  loadPurchase() {
    this.buySvc.getAllPurchases().subscribe((res:any)=> {
      if(res.purchases) {
        this.purchases = res.purchases;
      }
    });
  }

}
