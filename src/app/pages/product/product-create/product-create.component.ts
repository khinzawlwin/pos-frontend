import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { KitchensService } from '../../../services/kitchens.service';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  public product:any;
  public categories:any;
  public kitchens:any;
  selectedFiles: File;
  public user:any;

  constructor(
    public prodSvc: ProductsService,
    public catSvc: CategoriesService,
    public kitSvc: KitchensService,
    public router: Router,
    public auth: AuthService,
  ) { 
    this.product = {};
  }

  ngOnInit() {
    
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

    this.user = this.auth.user();
    // console.log(this.user);
    this.product.created_by = this.user.id;
    this.product.category_id = "0";
    this.product.kitchen_id = "0";
  }

  selectFile(event) {
    this.selectedFiles = event.target.files[0];

  }

  onCreateProdSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }else {
      this.product.thumbnail = this.selectedFiles;
      console.log(this.product);
      this.prodSvc.createProduct(this.product).subscribe((res:any)=>{
        if(res.product) {
          this.router.navigate(["/products"]);
        }else {
          res.message;
        }
      },
      (res:any)=>{
        if(res.error) {
          console.log(res.error);
        }
      });
    }
  }

}
