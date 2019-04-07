import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Router } from '@angular/router';
import {ExcelServiceService} from '../../../services/excel-service.service';

@Component({
  selector: 'app-stock-qty',
  templateUrl: './stock-qty.component.html',
  styleUrls: ['./stock-qty.component.css']
})
export class StockQtyComponent implements OnInit {

  public stocks:any;

  constructor(
    public rptSvc: ReportsService,
    public router: Router,
    private excelSvc: ExcelServiceService,
  ) { }

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.rptSvc.getAllStocks().subscribe((res:any)=> {
      if(res.stocks) {
        this.stocks = res.stocks;
      }
    });
  }

  exportAsXLSX():void {
    let data = [];
    this.stocks.forEach(item=> {
      let id = item.id;
      let name = item.name;
      let qtyOpeningBalance = item.qty_opening_balance;
      let qtyWarehouse = item.qty_warehouse;
      let qtyCounter = item.qty_counter;
      
      data.push({id:id, name:name, qtyOpeningBalance:qtyOpeningBalance, qtyWarehouse:qtyWarehouse, qtyCounter:qtyCounter});
    });
    
    this.excelSvc.exportAsExcelFile(data, 'StockQty');
  }

}
