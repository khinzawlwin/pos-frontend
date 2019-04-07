import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';

declare var window;

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  
  public customer:any;
  public url:any;
  public id:any;

  constructor(
    public custSvc: CustomersService,
    private router: Router
  ) { 
    this.customer = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.custSvc.getCustomer(this.id).subscribe((res:any)=>{
      if(res.customer) {
        this.customer = res.customer;
      }
    },
    (res:any)=>{
      console.log("error fetching customer");
    });
  }

  onEditCustSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.custSvc.updateCustomer(this.id, this.customer).subscribe((res:any)=>{
      console.log(res);
      if(res.customer) {
        this.router.navigate(["/customers"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      console.log(res.error);
    });

  }

}
