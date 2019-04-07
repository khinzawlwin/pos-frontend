import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Router } from '@angular/router';
import {ExcelServiceService} from '../../../services/excel-service.service';

@Component({
  selector: 'app-sales-qty',
  templateUrl: './sales-qty.component.html',
  styleUrls: ['./sales-qty.component.css']
})
export class SalesQtyComponent implements OnInit {
  public saleQty:any;
  public query:any = {
    start_date: '',
    end_date: ''
  };
  public saleQtyReport:any;

  constructor(
    public rptSvc: ReportsService,
    public router: Router,
    private excelSvc: ExcelServiceService,
  ) { }

  ngOnInit() {
    this.loadSalesQty();
  }

  loadSalesQty() {
    this.rptSvc.getSalesQty(this.query).subscribe((res:any)=> {
      if(res.saleQty) {
        let data = [];
        this.saleQtyReport = res.saleQty;
        res.saleQty.forEach((item, i)=>{
          let id = i+1;
          let itemName = item.Product.name;
          let code = item.Product.code;
          let qty = item.qty;
          data.push({id:id, itemName:itemName, code:code, qty:qty});
        });

        this.saleQty = data;
      }
    });
  }

  onFilter() {
    this.loadSalesQty();
  }

  exportAsXLSX():void {
    let data = [];
    this.saleQtyReport.forEach(item=> {
      let id = item.Product.id;
      let name = item.Product.name;
      let code = item.Product.code;
      let qty = item.qty;
      data.push({id:id, name:name, code:code, qty:qty});
    })
    console.log(data);
    this.excelSvc.exportAsExcelFile(data, 'SaleQty');
  }

}
