import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-supplier-material-relation',
  templateUrl: './supplier-material-relation.component.html',
  styleUrls: ['./supplier-material-relation.component.css']
})
export class SupplierMaterialRelationComponent {
  supplierMaterialRelationForm:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.supplierMaterialRelationForm = this.formBuilder.group({
      materialId: ['', Validators.compose([Validators.required])],
      supplierName: ['', Validators.compose([Validators.required])],
      rate: ['', Validators.compose([Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)])]
    });
  }

  onSubmit() {
    if (this.supplierMaterialRelationForm.valid) {
      const formData = this.supplierMaterialRelationForm.value;
      console.log(formData);

      // Here, you can save the relation data, send it to an API, etc.
    }
  }

}
