import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products:any;
  public userRole:any;
  public p:any;

  constructor(
    public prodSvc: ProductsService,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.p = 1;
    this.userRole = this.auth.user();
    if(this.userRole.role == 4 || this.userRole.role == 5) {
      this.router.navigate(["/sales/create"]);
    }

    this.loadProducts();
  }

  loadProducts() {
    this.products = [];
    this.prodSvc.getAll().subscribe((data:any)=>{
      // console.log(data.products);
      if(data.products) {
        this.products = data.products;
      }
    });
  }

  deleteProduct(id) {
    this.prodSvc.deleteProduct(id).subscribe((res:any)=>{
      console.log(res.product);
      if(res.product) {
        for(let i = 0; i < this.products.length; ++i){
          if (this.products[i].id === id) {
              this.products.splice(i,1);
          }
        }

        this.router.navigate(["/products"]);
        // window.location = "/products";
      }else{
        alert(res.message);
        this.router.navigate(["/products"]);
      }
    })
  }

}
