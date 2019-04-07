import { Component, OnInit } from '@angular/core';
import { KitchensService } from '../../../services/kitchens.service';
import { Router } from '@angular/router';

declare var window;

@Component({
  selector: 'app-kitchen-edit',
  templateUrl: './kitchen-edit.component.html',
  styleUrls: ['./kitchen-edit.component.css']
})
export class KitchenEditComponent implements OnInit {
  public kitchen:any;
  public url:any;
  public id:any;

  constructor(
    public kitSvc: KitchensService,
    public router: Router
  ) { 
    this.kitchen = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.kitSvc.getKitchen(this.id).subscribe((res:any)=>{
      if(res.kitchen) {
        this.kitchen = res.kitchen;
      }
    },
    (res:any)=>{
      console.log("error fetching kitchen");
    });
  }

  onEditKitSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.kitSvc.updateKitchen(this.id, this.kitchen).subscribe((res:any)=>{
      console.log(res);
      if(res.kitchen) {
        this.router.navigate(["/kitchens"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      console.log(res.error);
    });

  }

}
