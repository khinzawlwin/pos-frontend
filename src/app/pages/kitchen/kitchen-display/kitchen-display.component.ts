import { Component, OnInit } from '@angular/core';
import { KitchensService } from '../../../services/kitchens.service';
import { AuthService} from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-display',
  templateUrl: './kitchen-display.component.html',
  styleUrls: ['./kitchen-display.component.css']
})
export class KitchenDisplayComponent implements OnInit {
  public kitchenOrders:any;
  public userRole:any;
  public kitchens:any;
  public orderCount: any;
  public currentOrderCount: any;

  constructor(
    public kitSvc: KitchensService,
    public auth: AuthService,
    private router: Router,
    public cartSvc: CartService,
  ) { }

  ngOnInit() {
    this.userRole = this.auth.user();
    this.loadKitchen();
    this.loadOrders();
    this.loadOrderCount();

    setInterval(() => { 
      this.loadOrders(); 
    }, 1000);
  }

  loadOrderCount() {
    this.kitSvc.getKitchenOrders().subscribe((res:any)=> {
      if(res.kitchenOrders) {
        this.orderCount = res.kitchenOrders.length;
        console.log(this.orderCount);
      }
    });
  }

  loadOrders() {
    this.kitSvc.getKitchenOrders().subscribe((res:any)=> {
      if(res.kitchenOrders) {
        let order:any = "";
        this.kitchenOrders = res.kitchenOrders;
        this.currentOrderCount = res.kitchenOrders.length;
        res.kitchenOrders.map((order, i)=> {
          order.no = i+1;
        });
        this.kitchenOrders.push(order);
        console.log(this.currentOrderCount);
      }

      if(this.currentOrderCount > this.orderCount ) {
        this.setSound();
        this.orderCount = this.currentOrderCount;
      }
    });
  }

  setSound(){
    let audio = new Audio();
    audio.src = "../../../assets/sounds/samsung_galaxy_alarm.mp3";
    audio.load();
    audio.play();
  }

  loadKitchen() {
    this.kitSvc.getAll().subscribe((res:any)=> {
      if(res.kitchens) {
        this.kitchens = res.kitchens;
      }
    });
  }

  kitchenReady(id) {
    this.kitSvc.updateKitchenStatus(id).subscribe((res:any)=> {
      if(res.kitchenOrder) {
        this.loadOrders();
      }
    });

  }
  waiterConfirm(id) {
    this.kitSvc.updateWaiterStatus(id).subscribe((res:any)=> {
      if(res.kitchenOrder) {
        this.loadOrders();
      }
    });
  }

  returnPOS() {
    this.cartSvc.clear();

    this.router.navigate(["/sales/create"]);
  }

}
