import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';

declare var window;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories:any;
  public userRole:any;

  constructor(
    public catSvc: CategoriesService,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.userRole = this.auth.user();
    if(this.userRole.role == 4 || this.userRole.role == 5) {
      this.router.navigate(["/sales/create"]);
    }
    
    this.loadCategories();
  }

  loadCategories() {
    this.categories = [];
    this.catSvc.getAll().subscribe((data:any)=>{
      console.log(data.categories);
      if(data.categories) {
        this.categories = data.categories;
      }
    });
  }

  deleteCategory(id) {
    this.catSvc.deleteCategory(id).subscribe((res:any)=>{
      console.log(res.category);
      if(res.category) {
        for(let i = 0; i < this.categories.length; ++i){
          if (this.categories[i].id === id) {
              this.categories.splice(i,1);
          }
        }

        this.router.navigate(["/categories"]);
        // window.location = "/categories";
      }else{
        alert(res.message);
        this.router.navigate(["/categories"]);
      }
    })
  }

}
