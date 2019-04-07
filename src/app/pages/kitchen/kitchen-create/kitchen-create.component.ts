import { Component, OnInit } from '@angular/core';
import { KitchensService } from '../../../services/kitchens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-create',
  templateUrl: './kitchen-create.component.html',
  styleUrls: ['./kitchen-create.component.css']
})
export class KitchenCreateComponent implements OnInit {
  public kitchen:any;

  constructor(
    public kitSvc: KitchensService,
    public router: Router
  ) { 
    this.kitchen = {};
  }

  ngOnInit() {
  }

  onCreateKitSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }else {
      console.log(form.value);

      this.kitSvc.createKitchen(this.kitchen).subscribe((res:any)=>{
        console.log(res);
        if(res.kitchen){
          this.router.navigate(["/kitchens"]);
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
