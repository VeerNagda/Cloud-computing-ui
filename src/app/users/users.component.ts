import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usersForm:FormGroup;
  products: any;
  cols: any;
  users: any;

  constructor(private formBuilder: FormBuilder) {
    this.usersForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      role: ['', Validators.compose([Validators.required])],
      sessionToken: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    if (this.usersForm.valid) {
      const formData = this.usersForm.value;
      console.log(formData);

      // Here, you can save the user data, send it to an API, etc.
    }
  }



}
