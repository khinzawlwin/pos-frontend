import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

declare var window:any;

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  public category:any;
  constructor(private catSvc: CategoriesService,
  private router: Router) { 
    this.category = {};
  }

  ngOnInit() {
  }

  onCreateCatSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }else {
      console.log(form.value);

      this.catSvc.createCategory(this.category).subscribe((res:any)=>{
        console.log(res);
        if(res.category){
          // window.location = "/categories";
          this.router.navigate(["/categories"]);
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

}
