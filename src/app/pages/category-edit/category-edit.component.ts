import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

declare var window;

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  public category:any;
  public url:any;
  public id:any;
  constructor(
    private catSvc: CategoriesService,
    private router: Router
  ) { 
    this.category = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {

    // alert(id);
    this.catSvc.getCategory(this.id).subscribe((res:any)=>{
      if(res.category) {
        this.category = res.category;
      }
    },
    (res:any)=>{
      console.log("error fetching category");
    });
  }

  onEditCatSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.catSvc.updateCategory(this.id, this.category).subscribe((res:any)=>{
      console.log(res);
      if(res.category) {
        this.router.navigate(["/categories"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      console.log(res.error);
    });

  }

}
