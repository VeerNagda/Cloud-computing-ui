import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent {
  buyerForm: FormGroup;
  buyer: any;

  constructor(private formBuilder: FormBuilder) {
    this.buyerForm = this.formBuilder.group({
      plantId: ['', Validators.compose([Validators.required])],
      plantName: ['', Validators.compose([Validators.required])],
      contactPerson: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      gst: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit(){
    if(this.buyerForm.valid){
      const formData=this.buyerForm.value;
      console.log(formData);
    }
  }

}
