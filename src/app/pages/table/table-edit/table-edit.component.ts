import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css']
})
export class TableEditComponent implements OnInit {
  public table:any;
  public url:any;
  public id:any;

  constructor(
    public tblSvc: TablesService,
    public router: Router
  ) { 
    this.table = {};
    this.url = window.location.href;
    this.id = this.url.split("/").pop();
  }

  ngOnInit() {
    this.tblSvc.getTable(this.id).subscribe((res:any)=>{
      if(res.table) {
        this.table = res.table;
      }
    },
    (res:any)=>{
      console.log("error fetching table");
    });
  }

  onEditTblSubmit(form) {
    if(!form.valid) {
      alert("Form validation errors!");
    }
    console.log(form.value);

    this.tblSvc.updateTable(this.id, this.table).subscribe((res:any)=>{
      console.log(res);
      if(res.table) {
        this.router.navigate(["/tables"]);
      }else{
        alert(res.message);
      }
    },
    (res:any)=>{
      console.log(res.error);
    });

  }

}
