import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { ProductsService } from './services/products.service';
import { AuthGuard } from './auth.guard';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';
import { CategoryEditComponent } from './pages/category-edit/category-edit.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductCreateComponent } from './pages/product/product-create/product-create.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { KitchenListComponent } from './pages/kitchen/kitchen-list/kitchen-list.component';
import { KitchenCreateComponent } from './pages/kitchen/kitchen-create/kitchen-create.component';
import { KitchenEditComponent } from './pages/kitchen/kitchen-edit/kitchen-edit.component';
import { TableListComponent } from './pages/table/table-list/table-list.component';
import { TableCreateComponent } from './pages/table/table-create/table-create.component';
import { TableEditComponent } from './pages/table/table-edit/table-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SaleCreateComponent } from './pages/sale/sale-create/sale-create.component';
import { SaleOrderComponent } from './pages/sale/sale-order/sale-order.component';
//Report
import { ReportListComponent } from './pages/report/report-list/report-list.component';
import { SalesTotalComponent } from './pages/report/sales-total/sales-total.component';
import { SalesReportComponent } from './pages/report/sales-report/sales-report.component';
import { SalesDetailComponent } from './pages/report/sales-detail/sales-detail.component';
import { SalesQtyComponent } from './pages/report/sales-qty/sales-qty.component';
import { ProductQtyComponent } from './pages/report/product-qty/product-qty.component';
import { StockQtyComponent } from './pages/report/stock-qty/stock-qty.component';

import { CustomerListComponent } from './pages/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './pages/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './pages/customer/customer-edit/customer-edit.component';
import { DemandListComponent } from './pages/demand/demand-list/demand-list.component';
import { DemandCreateComponent } from './pages/demand/demand-create/demand-create.component';
import { DemandEditComponent } from './pages/demand/demand-edit/demand-edit.component';
import { KitchenDisplayComponent } from './pages/kitchen/kitchen-display/kitchen-display.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SupplierListComponent } from './pages/supplier/supplier-list/supplier-list.component';
import { SupplierCreateComponent } from './pages/supplier/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './pages/supplier/supplier-edit/supplier-edit.component';
import { PurchaseComponent } from './pages/purchase/purchase/purchase.component';
import { PurchaseListComponent } from './pages/purchase/purchase-list/purchase-list.component';
import { PurchaseDetailComponent } from './pages/purchase/purchase-detail/purchase-detail.component';
import { OrderListComponent } from './pages/sale/order-list/order-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard]},
  { path: 'categories/create', component: CategoryCreateComponent, canActivate: [AuthGuard]},
  { path: 'categories/edit/:id', component: CategoryEditComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard]},
  { path: 'products/create', component: ProductCreateComponent, canActivate: [AuthGuard]},
  { path: 'products/edit/:id', component: ProductEditComponent, canActivate: [AuthGuard]},
  { path: 'kitchens', component: KitchenListComponent, canActivate: [AuthGuard]},
  { path: 'kitchens/create', component: KitchenCreateComponent, canActivate: [AuthGuard]},
  { path: 'kitchens/edit/:id', component: KitchenEditComponent, canActivate: [AuthGuard]},
  { path: 'tables', component: TableListComponent, canActivate: [AuthGuard]},
  { path: 'tables/create', component: TableCreateComponent, canActivate: [AuthGuard]},
  { path: 'tables/edit/:id', component: TableEditComponent, canActivate: [AuthGuard]},
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard]},
  { path: 'customers/create', component: CustomerCreateComponent, canActivate: [AuthGuard]},
  { path: 'customers/edit/:id', component: CustomerEditComponent, canActivate: [AuthGuard]},
  { path: 'customer-demands', component: DemandListComponent, canActivate: [AuthGuard]},
  { path: 'customer-demands/create', component: DemandCreateComponent, canActivate: [AuthGuard]},
  { path: 'customer-demands/edit/:id', component: DemandEditComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard]},
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SigninComponent },

  { path: 'sales/create', component: SaleCreateComponent, canActivate: [AuthGuard]},
  { path: 'sales/order/:id', component: SaleOrderComponent, canActivate: [AuthGuard]},
  { path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard]},

  { path: 'reports', component: ReportListComponent, canActivate: [AuthGuard]},
  { path: 'reports/sales-total', component: SalesTotalComponent, canActivate: [AuthGuard]},
  { path: 'reports/sales-report', component: SalesReportComponent, canActivate: [AuthGuard]},
  { path: 'reports/sales-detail', component: SalesDetailComponent, canActivate: [AuthGuard]},
  { path: 'reports/sales-qty', component: SalesQtyComponent, canActivate: [AuthGuard]},
  { path: 'reports/products-qty', component: ProductQtyComponent, canActivate: [AuthGuard]},
  { path: 'reports/stock-qty', component: StockQtyComponent, canActivate: [AuthGuard]},

  { path: 'kitchen-display', component: KitchenDisplayComponent, canActivate: [AuthGuard]},
  
  { path: 'suppliers', component: SupplierListComponent, canActivate: [AuthGuard]},
  { path: 'suppliers/create', component: SupplierCreateComponent, canActivate: [AuthGuard]},
  { path: 'suppliers/edit/:id', component: SupplierEditComponent, canActivate: [AuthGuard]},

  { path: 'purchases', component: PurchaseListComponent, canActivate: [AuthGuard]},
  { path: 'purchases/create', component: PurchaseComponent, canActivate: [AuthGuard]},
  { path: 'purchases/detail/:id', component: PurchaseDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    KitchenListComponent,
    KitchenCreateComponent,
    KitchenEditComponent,
    TableListComponent,
    TableCreateComponent,
    TableEditComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    SigninComponent,
    SaleCreateComponent,
    SaleOrderComponent,
    ReportListComponent,
    SalesTotalComponent,
    SalesReportComponent,
    SalesDetailComponent,
    SalesQtyComponent,
    ProductQtyComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    DemandListComponent,
    DemandCreateComponent,
    DemandEditComponent,
    KitchenDisplayComponent,
    SupplierListComponent,
    SupplierCreateComponent,
    SupplierEditComponent,
    PurchaseComponent,
    PurchaseListComponent,
    StockQtyComponent,
    PurchaseDetailComponent,
    OrderListComponent,
    
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }  //just for debuging 
    ),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    ChartsModule,
  ],
  
  providers: [ProductsService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
