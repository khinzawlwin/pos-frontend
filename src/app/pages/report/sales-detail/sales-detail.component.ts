import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Router } from '@angular/router';
import {ExcelServiceService} from '../../../services/excel-service.service';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {
public orders:any;
public orderItems:any;
public query:any = {
  start_date: '',
  end_date: ''
};

  constructor(
    public rptSvc: ReportsService,
    public router: Router,
    private excelSvc: ExcelServiceService,
  ) { }

  ngOnInit() {
    this.loadSalesDetail();
  }

  loadSalesDetail() {

    this.rptSvc.getSalesDetail(this.query).subscribe((res:any)=> {
      if(res.orders) {
        let order:any;
        this.orders = res.orders;
        this.orderItems = res.orderItems;
        res.orders.map((order, i)=>{
          order.no = i+1;
        });
        this.orders.push(order);
      }
    });
  }

  onFilter() {
    this.loadSalesDetail();
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
    this.excelSvc.exportAsExcelFile(this.orders, 'SaleDetailOrder');
    this.excelSvc.exportAsExcelFile(this.orderItems, 'SaleDetailOrderItem');
  }

}
