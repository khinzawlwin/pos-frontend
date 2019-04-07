import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { KitchensService } from '../../../services/kitchens.service';
import { Router } from '@angular/router';

declare var window;

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public product:any;
  public categories:any;
  public kitchens:any;
  public url:any;
  public id:any;
  selectedFiles: File;

  constructor(
    public prodSvc: ProductsService,
    public catSvc: CategoriesService,
    public kitSvc: KitchensService,
    public router: Router
  ) { 
    this.product = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.prodSvc.getProduct(this.id).subscribe((res:any)=>{
      if(res.product) {
        this.product = res.product;
      }
    },
    (res:any)=>{
      console.log("error fetching product");
    });

    this.catSvc.getAll().subscribe((res:any)=>{
      if(res.categories) {
        this.categories = res.categories;
      }
    });
  
    this.kitSvc.getAll().subscribe((res:any)=>{
      if(res.kitchens) {
        this.kitchens = res.kitchens;
      }
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files[0];

  }

  onEditProdSubmit(form) {
    if(!form.valid) {
      alert("Form vlaidation errors!");
    }
    this.product.thumbnail = this.selectedFiles;
    console.log(this.product);
    this.prodSvc.updateProduct(this.id, this.product).subscribe((res:any)=>{
      if(res.product) {
        this.router.navigate(["/products"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      if(res.error) {
        console.log(res.error);
      }
    });
  }

}
