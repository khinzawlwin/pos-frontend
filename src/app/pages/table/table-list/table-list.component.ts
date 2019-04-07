import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public tables:any;
  constructor(
    public tblSvc: TablesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tables = [];
    this.tblSvc.getAll().subscribe((data:any)=>{
      console.log(data.tables);
      if(data.tables) {
        this.tables = data.tables;
      }
    });
  }

  deleteTbl(id) {
    this.tblSvc.deleteTable(id).subscribe((res:any)=>{
      console.log(res.table);
      if(res.table) {
        for(let i = 0; i < this.tables.length; ++i){
          if (this.tables[i].id === id) {
              this.tables.splice(i,1);
          }
        }

        this.router.navigate(["/tables"]);
        // window.location = "/tables";
      }else{
        alert(res.message);
        this.router.navigate(["/tables"]);
      }
    })
  }

}
