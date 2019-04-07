import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { KitchensService } from '../../../services/kitchens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public user:any;
  public roles:any;
  public kitchens:any;
  public url:any;
  public id:any;

  constructor(
    public userSvc: UsersService,
    public kitSvc: KitchensService,
    public router: Router
  ) { 
    this.user = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.userSvc.getUser(this.id).subscribe((res:any)=>{
      console.log(res.user);
      if(res.user) {
        this.user = res.user;
        this.user.password = '';
      }
    },
    (res:any)=>{
      console.log("error fetching user");
    });

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

  onEditUserSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    // console.log(form.value);
    if(form.value.password.length < 6 && form.value.password != "") {
      alert("Invalid password required minimum 6 character!");
      this.router.navigate(["/users/edit/"+this.id]);
    }else {
      this.userSvc.updateUser(this.id, this.user).subscribe((res:any)=>{
        console.log(res);
        if(res.user) {
          this.router.navigate(["/users"]);
        }else{
          alert(res.message);
        }
      },
      (res:any)=>{
        console.log(res.error);
      });
    }

  }

}
