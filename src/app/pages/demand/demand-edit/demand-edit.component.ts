import { Component, OnInit } from '@angular/core';
import { DemandsService } from '../../../services/demands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-edit',
  templateUrl: './demand-edit.component.html',
  styleUrls: ['./demand-edit.component.css']
})
export class DemandEditComponent implements OnInit {
  public demand:any;
  public url:any;
  public id:any;

  constructor(
    public demSvc: DemandsService,
    private router: Router
  ) { 
    this.demand = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.demSvc.getDemand(this.id).subscribe((res:any)=>{
      if(res.demand) {
        this.demand = res.demand;
      }
    },
    (res:any)=>{
      console.log("error fetching kitchen");
    });
  }

  onEditDemSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.demSvc.updateDemand(this.id, this.demand).subscribe((res:any)=>{
      console.log(res);
      if(res.demand) {
        this.router.navigate(["/customer-demands"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      console.log(res.error);
    });

  }

}
