import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SupplierComponent } from './supplier/supplier.component';
import { BuyerComponent } from './buyer/buyer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SupplierComponent,
    BuyerComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
