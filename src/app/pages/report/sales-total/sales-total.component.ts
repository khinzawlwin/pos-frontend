import { Component, OnInit, Injectable } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Router } from '@angular/router';
import {ExcelServiceService} from '../../../services/excel-service.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sales-total',
  templateUrl: './sales-total.component.html',
  styleUrls: ['./sales-total.component.css']
})
export class SalesTotalComponent implements OnInit {
  public salesTotal:any;
  public query:any = {
    start_date: '',
    end_date: '',
  };
  // public data:any = [];

  constructor(
    public rptSvc: ReportsService,
    public router: Router,
    private excelSvc: ExcelServiceService,
  ) { 
    
  }

  ngOnInit() {
    this.loadSalesTotal();
  }

  loadSalesTotal() {
    this.rptSvc.getSalesTotal(this.query).subscribe((res:any)=> {
      if(res.ordersTotal) {
        this.salesTotal = res.ordersTotal;
        console.log(this.salesTotal);
      }
    });
  }

  onFilter() {
    console.log(this.query);
    this.loadSalesTotal();
  }

  exportAsXLSX():void {
    this.excelSvc.exportAsExcelFile(this.salesTotal, 'SaleTotal');
  }

}
