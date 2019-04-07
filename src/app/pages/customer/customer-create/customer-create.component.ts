import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  public customer:any;

  constructor(
    public custSvc: CustomersService,
    private router: Router
  ) { 
    this.customer = {};
  }

  ngOnInit() {
  }

  onCreateCustSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.custSvc.createCustomer(this.customer).subscribe((res:any)=>{
      console.log(res);
      if(res.customer){
        this.router.navigate(["/customers"]);
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
