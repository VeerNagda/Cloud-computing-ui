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
      username: ['',Validators.required,Validators.minLength(6)],
      password: ['',Validators.required,Validators.minLength(8)]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const formData=this.loginForm.value;
      console.log(formData);
    }
  }



}
