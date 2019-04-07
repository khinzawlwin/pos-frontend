import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.css']
})
export class TableCreateComponent implements OnInit {
  public table:any;
  constructor(
    public tblSvc: TablesService,
    public router: Router
  ) { 
    this.table = {};
  }

  ngOnInit() {
  }

  onCreateTblSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }else {
      console.log(form.value);

      this.tblSvc.createTable(this.table).subscribe((res:any)=>{
        console.log(res);
        if(res.table){
          this.router.navigate(["/tables"]);
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
