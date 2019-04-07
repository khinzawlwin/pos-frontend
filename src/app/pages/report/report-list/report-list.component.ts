import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  public userRole:any;
  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.userRole = this.auth.user();
    if(this.userRole.role == 4 || this.userRole.role == 5) {
      this.router.navigate(["/sales/create"]);
    }
  }

}
