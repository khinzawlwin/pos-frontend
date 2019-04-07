import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { Router } from '@angular/router';
import { AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers:any;
  public userRole:any;

  constructor(
    public custSvc: CustomersService,
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.userRole = this.auth.user();
    if(this.userRole.role == 4 || this.userRole.role == 5) {
      this.router.navigate(["/sales/create"]);
    }

    this.loadCustomers();
  }

  loadCustomers() {
    this.customers = [];
    this.custSvc.getAll().subscribe((data:any)=>{
      console.log(data.customers);
      if(data.customers) {
        this.customers = data.customers;
      }
    });
  }

  deleteCustomer(id) {
    this.custSvc.deleteCustomer(id).subscribe((res:any)=>{
      console.log(res.customer);
      if(res.customer) {
        for(let i = 0; i < this.customers.length; ++i){
          if (this.customers[i].id === id) {
              this.customers.splice(i,1);
          }
        }

        this.router.navigate(["/customers"]);
        // window.location = "/customers";
      }else{
        alert(res.message);
        this.router.navigate(["/customers"]);
      }
    })
  }

}
