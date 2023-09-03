import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  materialForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.materialForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      grade: ['', Validators.compose([Validators.required])],
      width: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])],
      thickness: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)])]
    });
  }

  onSubmit() {
    if (this.materialForm.valid) {
      const formData = this.materialForm.value;
      console.log(formData);

      // Here, you can save the material data, send it to an API, etc.
    }
  }


}
