import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SupplierComponent} from './supplier/supplier.component';
import {BuyerComponent} from './buyer/buyer.component';
import {UsersComponent} from './users/users.component';
import {MaterialComponent} from './material/material.component';
import {PartComponent} from './part/part.component';
import {PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import {SupplierMaterialRelationComponent} from './supplier-material-relation/supplier-material-relation.component';
import {SharedService} from "./shared.service";
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import {DropdownModule} from "primeng/dropdown";
import {authGuard} from "./gaurd/auth.guard";
import { CookieService } from 'ngx-cookie-service';


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
    SupplierMaterialRelationComponent,
    NavMenuComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        BrowserAnimationsModule,
        DialogModule,
        ToastModule,
        RouterModule.forRoot([
            {path: '', component: LoginComponent, pathMatch: 'full'},
            {path: 'supplier-master', component: SupplierComponent,  canActivate: [authGuard]},
            {path: 'buyer-master', component: BuyerComponent,  canActivate: [authGuard]},
            {path: 'part-master', component: PartComponent,  canActivate: [authGuard]},
            {path: 'purchase-order-master', component: PurchaseOrderComponent,  canActivate: [authGuard]},
            {path: 'supplier-materials', component: SupplierMaterialRelationComponent,  canActivate: [authGuard]},
            {path: 'material-master', component: MaterialComponent,  canActivate: [authGuard]},

        ]),
        ConfirmDialogModule,
        FormsModule,
        DropdownModule,
    ],
  providers: [SharedService, ConfirmationService, MessageService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
