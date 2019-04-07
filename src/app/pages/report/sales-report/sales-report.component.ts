import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Router } from '@angular/router';
import {ExcelServiceService} from '../../../services/excel-service.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  public orders:any;
  public query:any = {
    start_date: '',
    end_date: ''
  };

  constructor(
    public rptSvc: ReportsService,
    public router: Router,
    private excelSvc: ExcelServiceService,
  ) { 
    
  }

  ngOnInit() {
    this.loadSalesReport();
  }

  loadSalesReport() {
    this.rptSvc.getSalesReport(this.query).subscribe((res:any)=> {
      if(res.orders) {
        let order:any;
        this.orders = res.orders;
        res.orders.map((order, i)=>{
          order.id = i+1;
        });
        this.orders.push(order);
      }
    });
  }

  onFilter() {
    this.loadSalesReport();
  }

  exportAsXLSX():void {
    let undefinedIndex = null;
    this.orders.map((order, i)=> {
      if(order == undefined) {
        undefinedIndex = i;
      }
    });

    if(undefinedIndex != null) {
      this.orders.splice(undefinedIndex, 1);
    }
    
    // console.log(this.orders);
    this.excelSvc.exportAsExcelFile(this.orders, 'SaleReport');
  }

}
