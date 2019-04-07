import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../../services/suppliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  public supplier:any; 

  constructor(
    public supplierSvc: SuppliersService,
    public router: Router
  ) { 
    this.supplier = {};
  }

  ngOnInit() {
  }

  onCreateSuppSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
      this.router.navigate(["/suppliers"]);
    }else {
      console.log(form.value);

      this.supplierSvc.createSupplier(this.supplier).subscribe((res:any)=>{
        console.log(res);
        if(res.supplier){
          this.router.navigate(["/suppliers"]);
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
