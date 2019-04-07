import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { KitchensService } from '../../../services/kitchens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public user:any;
  public roles:any;
  public kitchens:any;

  constructor(
    public userSvc: UsersService,
    public kitSvc: KitchensService,
    public router: Router
  ) { 
    this.user = {};
  }

  ngOnInit() {
    this.userSvc.getRole().subscribe((res:any)=>{
      if(res.roles) {
        this.roles = res.roles;
      }
    });
    this.kitSvc.getAll().subscribe((res:any)=> {
      if(res.kitchens) {
        this.kitchens = res.kitchens;
      }
    });
  }

  onCreateUserSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }else {
      console.log(form.value);

      this.userSvc.createUser(this.user).subscribe((res:any)=>{
        console.log(res);
        if(res.user){
          this.router.navigate(["/users"]);
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
