import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SupplierComponent } from './supplier/supplier.component';
import { BuyerComponent } from './buyer/buyer.component';
import { UsersComponent } from './users/users.component';
import { MaterialComponent } from './material/material.component';
import { PartComponent } from './part/part.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { SupplierMaterialRelationComponent } from './supplier-material-relation/supplier-material-relation.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupplierComponent,
    BuyerComponent,
    UsersComponent,
    MaterialComponent,
    PartComponent,
    PurchaseOrderComponent,
    SupplierMaterialRelationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
