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
  supplierForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      contactNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      gst: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    if (this.supplierForm.valid) {
      const formData = this.supplierForm.value;
      console.log(formData);
    }
  }
}
