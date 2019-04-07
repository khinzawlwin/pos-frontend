import { Component, OnInit } from '@angular/core';
import { DemandsService } from '../../../services/demands.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.css']
})
export class DemandListComponent implements OnInit {
  public demands:any;

  constructor(
    public demSvc: DemandsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadDemands();
  }

  loadDemands() {
    this.demands = [];
    this.demSvc.getAll().subscribe((data:any)=>{
      console.log(data.demands);
      if(data.demands) {
        this.demands = data.demands;
      }
    });
  }

  deleteDemand(id) {
    this.demSvc.deleteDemand(id).subscribe((res:any)=>{
      if(res.demand) {
        for(let i = 0; i < this.demands.length; ++i){
          if (this.demands[i].id === id) {
              this.demands.splice(i,1);
          }
        }

        this.router.navigate(["/kitchens"]);
        // window.location = "/kitchens";
      }else{
        alert(res.message);
        this.router.navigate(["/kitchens"]);
      }
    })
  }

}
