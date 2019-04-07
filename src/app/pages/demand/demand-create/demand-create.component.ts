import { Component, OnInit } from '@angular/core';
import { DemandsService } from '../../../services/demands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-create',
  templateUrl: './demand-create.component.html',
  styleUrls: ['./demand-create.component.css']
})
export class DemandCreateComponent implements OnInit {
  public demand:any;

  constructor(
    public demSvc: DemandsService,
    private router: Router
  ) { 
    this.demand = {};
  }

  ngOnInit() {
  }

  onCreateDemSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.demSvc.createDemand(this.demand).subscribe((res:any)=>{
      console.log(res);
      if(res.demand){
        this.router.navigate(["/customer-demands"]);
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
