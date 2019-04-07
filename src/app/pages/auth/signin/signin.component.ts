import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

declare var window:any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:any = {
    phone:'',
    password:''
  };

  constructor(
    private authSvc: AuthService,
    public router: Router
  ) { 
    // override the route reuse strategy
     this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }

     this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
     });
  }

  ngOnInit() {
  }

  onSigninFormSubmit(form){
    console.log(this.user);
    
    this.authSvc.login(this.user).subscribe((res:any)=>{
      if(res.user && res.token){
        this.authSvc.saveUser(res.user, res.token);
        
        let authUser:any = this.authSvc.user();
        if(authUser.role != 5) {
          // this.router.navigate(["/sales/create"]); 
          window.location="/sales/create"; 
        }else {
          // this.router.navigate(["/kitchen-display"]);
          window.location="/kitchen-display";
        }
      }
    },
  (res:any)=>{
    
    if(res.error){
      console.log(res.error);
      alert("Invalid Phone and Password");
      // toastr.warning(res.error.message.message);
    }
  });
  }

}
