import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../../services/suppliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  public suppliers:any;

  constructor(
    public supplierSvc: SuppliersService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.suppliers = [];
    this.supplierSvc.getAll().subscribe((data:any)=>{
      console.log(data.suppliers);
      if(data.suppliers) {
        this.suppliers = data.suppliers;
      }
    });
  }

  deleteSupp(id) {
    this.supplierSvc.deleteSupplier(id).subscribe((res:any)=>{
      console.log(res.supplier);
      if(res.supplier) {
        for(let i = 0; i < this.suppliers.length; ++i){
          if (this.suppliers[i].id === id) {
              this.suppliers.splice(i,1);
          }
        }

        this.router.navigate(["/suppliers"]);
        
      }else{
        alert(res.message);
        this.router.navigate(["/suppliers"]);
      }
    })
  }

}
