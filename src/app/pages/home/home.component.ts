import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public activeStocks:any;
  public topProducts:any;
  public saleTotals:any;
  public thisMonthTotal:any;
  public totalUser:any;
  public currentOrder:any;

  public strDate: any =[];
  public total:any =[];
  public chart:any =[];

  constructor(
    public dbSvc: DashboardService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.loadDashboard();
    this.setChart();
  }

  loadDashboard() {
    this.dbSvc.getStocks().subscribe((res:any)=> {
      if(res.activeStocks) {
        this.activeStocks = res.activeStocks.length;
      }
    });

    this.dbSvc.getTopProducts().subscribe((res:any)=> {
      if(res.topProducts) {
        let data = [];
        res.topProducts.forEach((item, i)=> {
          let id = i+1;
          let itemName = item.Product.name;
          let qty = item.qty
          data.push({id:id, itemName:itemName, qty:qty});
        });
        this.topProducts = data;
      }
    });

    this.dbSvc.getSaleTotals().subscribe((res:any)=> {
      if(res.thisMonthTotal) {
        this.thisMonthTotal = res.thisMonthTotal;
      }
      if(res.currentOrder) {
        this.currentOrder = res.currentOrder.length;
      }
    });

    this.dbSvc.getRegisterUsers().subscribe((res:any)=> {
      if(res.users) {
        this.totalUser = res.users.length;
      }
    });

  }

  setChart() {
    this.dbSvc.getSaleTotals().subscribe((res:any)=> {
      if(res.ordersTotal) {
        res.ordersTotal.forEach(t=> {
          this.strDate.push(t.date);
          this.total.push(t.totalAmount);
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.strDate,
            datasets: [
              {
                data: this.total,
                borderColor: '#3cba9f',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      //endchart
      }
    });
  }

}
