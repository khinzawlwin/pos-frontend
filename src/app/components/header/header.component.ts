import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Title } from '@angular/platform-browser';

declare var window:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userRole:any;

  constructor(
    public auth: AuthService,
    public router: Router,
    private titleSvc: Title
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

  public setTitle( newTitle: string) {
    this.titleSvc.setTitle( 'POS | ' + newTitle );
  }

  ngOnInit() {
    this.userRole = this.auth.user();
    if(this.userRole.role == '4' || this.userRole.role == '5') {
      $(document).ready(function(){
        $("body.skin-blue").addClass("sidebar-collapse");
        $(".sidebar-mini .content-wrapper").addClass("ml0");
        $(".sidebar-mini .main-footer").addClass("ml0");
      });
    }
  }

  onLogout(e) {
    // alert("logout");
    var confm = confirm("Are you sure to logout?");
    if(confm) {
      this.auth.logOut().subscribe(res=>{
        // this.router.navigate(["/signin"]);
        window.location="/signin";
      });
    }
  }

}
