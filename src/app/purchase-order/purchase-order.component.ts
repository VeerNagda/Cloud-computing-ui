import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent {
  purchaseOrderForm: FormGroup;
  purchaseOrder: any;

  constructor(private formBuilder: FormBuilder) {
    this.purchaseOrderForm = this.formBuilder.group({
      PO_No: ['', Validators.compose([Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)])],
      date: [null, Validators.compose([Validators.required])],
      buyer: ['', Validators.compose([Validators.required])],
      Valid_From: [null, Validators.compose([Validators.required])],
      Valid_Till: [null, Validators.compose([Validators.required])],
      Payment_Term: ['', Validators.compose([Validators.required])],
      Part_No: ['', Validators.compose([Validators.required])],
      Qty: [null, Validators.compose([Validators.required])],
      Rate: ['', Validators.compose([Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)])],
      Amendment: [null, Validators.compose([Validators.required])],
      Amended_PO_Number: ['', Validators.compose([Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)])]
    });
  }

  onSubmit() {
    if (this.purchaseOrderForm.valid) {
      const formData = this.purchaseOrderForm.value;
      console.log(formData);

      // Here, you can save the purchase order data, send it to an API, etc.
    }
  }


}
