import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";

interface Supplier{
  name:string;
  address:string;
  contactNumber: string;
  gst:string;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  supplierForm:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gst: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.supplierForm.valid) {
      const formData: Supplier = this.supplierForm.value;
      console.log(formData);

      // Here, you can save the supplier data, send it to an API, etc.
    }
  }
}
