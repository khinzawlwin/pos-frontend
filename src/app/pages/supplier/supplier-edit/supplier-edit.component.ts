import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../../services/suppliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  public supplier:any;
  public url:any;
  public id:any;

  constructor(
    public supplierSvc: SuppliersService,
    public router: Router
  ) { 
    this.supplier = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.supplierSvc.getSupplier(this.id).subscribe((res:any)=>{
      if(res.supplier) {
        this.supplier = res.supplier;
      }
    },
    (res:any)=>{
      console.log("error fetching supplier");
    });
  }

  onEditSuppSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.supplierSvc.updateSupplier(this.id, this.supplier).subscribe((res:any)=>{
      console.log(res);
      if(res.supplier) {
        this.router.navigate(["/suppliers"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      console.log(res.error);
    });

  }

}