import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm=this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const formData=this.loginForm.value;
      console.log(formData);
    }
  }



}
