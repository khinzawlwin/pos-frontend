import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';
import { Router } from '@angular/router';
import {ExcelServiceService} from '../../../services/excel-service.service';

@Component({
  selector: 'app-product-qty',
  templateUrl: './product-qty.component.html',
  styleUrls: ['./product-qty.component.css']
})
export class ProductQtyComponent implements OnInit {

  public products:any;
  public saleQty:any;
  public defaultQty:any;
  public query:any = {
    start_date: '',
    end_date: ''
  };
  public productQtyReport:any;
  
  constructor(
    public rptSvc: ReportsService,
    public router: Router,
    private excelSvc: ExcelServiceService,
  ) { 
    
  }

  ngOnInit() {
    this.loadProductQty();
    this.loadProductQtyExport();
  }

  loadProductQty() {
    this.defaultQty = 0;
    this.rptSvc.getSalesAllQty(this.query).subscribe((res:any)=> {
      if(res.products) {
        let item:any;        
        this.products = res.products;
        res.products.map((item, i)=> {
          item.no = i+1;
        });
        this.products.push(item);

        this.saleQty = res.saleQty;
        
      }
    });
  }

  loadProductQtyExport() {
    this.rptSvc.getSalesAllQty(this.query).subscribe((res:any)=> {
      if(res.products) {
        this.productQtyReport = res.products;
      }
    });
  }

  onFilter() {
    this.loadProductQty();
    this.loadProductQtyExport();
  }

  exportAsXLSX():void {
    let data = [];
    this.productQtyReport.forEach(item=> {
      let id = item.id;
      let name = item.name;
      let code = item.code;
      let qty = 0;
      this.saleQty.forEach(q=> {
        if(item.id == q.product_id) {
          qty = q.qty;
        }
      });
      data.push({id:id, name:name, code:code, qty:qty});
    });
    // console.log(data);
    this.excelSvc.exportAsExcelFile(data, 'ProductQty');
  }

}
