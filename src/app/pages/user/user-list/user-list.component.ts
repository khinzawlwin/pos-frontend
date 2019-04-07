import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users:any;

  constructor(
    public userSvc: UsersService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = [];
    this.userSvc.getAll().subscribe((data:any)=>{
      console.log(data.users);
      if(data.users) {
        this.users = data.users;
      }
    });
  }

  deleteUsr(id) {
    this.userSvc.deleteUser(id).subscribe((res:any)=>{
      console.log(res.user);
      if(res.user) {
        for(let i = 0; i < this.users.length; ++i){
          if (this.users[i].id === id) {
              this.users.splice(i,1);
          }
        }

        this.router.navigate(["/users"]);
        // window.location = "/users";
      }else{
        alert(res.message);
        this.router.navigate(["/users"]);
      }
    })
  }

}
