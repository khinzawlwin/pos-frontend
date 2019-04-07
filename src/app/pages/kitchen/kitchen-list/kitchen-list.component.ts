import { Component, OnInit } from '@angular/core';
import { KitchensService } from '../../../services/kitchens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.css']
})
export class KitchenListComponent implements OnInit {
  public kitchens:any;

  constructor(
    public kitSvc: KitchensService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadKitchens();
  }

  loadKitchens() {
    this.kitchens = [];
    this.kitSvc.getAll().subscribe((data:any)=>{
      console.log(data.kitchens);
      if(data.kitchens) {
        this.kitchens = data.kitchens;
      }
    });
  }

  deleteKitchen(id) {
    this.kitSvc.deleteKitchen(id).subscribe((res:any)=>{
      if(res.kitchen) {
        for(let i = 0; i < this.kitchens.length; ++i){
          if (this.kitchens[i].id === id) {
              this.kitchens.splice(i,1);
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
