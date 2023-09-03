import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";


@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent {
  partForm:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.partForm = this.formBuilder.group({
      partNumber: ['', Validators.compose([Validators.required])],
      partName: ['', Validators.compose([Validators.required])],
      material1: ['', Validators.compose([Validators.required])],
      material2: ['', Validators.compose([Validators.required])],
    });
  }


  onSubmit() {
    if (this.partForm.valid) {
      const formData = this.partForm.value;
      console.log(formData);

      // Here, you can save the material data, send it to an API, etc.
    }
  }
}
