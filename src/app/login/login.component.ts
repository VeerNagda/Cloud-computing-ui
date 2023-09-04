import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http"
import {SharedService} from "../shared.service";
import {MessageModel} from "../Models/message-model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  private message: MessageModel = new MessageModel();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      ID: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<MessageModel>(this.sharedService.apiUrl + "userauth/login", this.loginForm.value).subscribe(result => {
        this.message = result;
        if(this.message.status == 200){
          this.router.navigate(['/material-master']).then(r => console.log(r));
        }
        else if (this.message.status == 200){
          console.log(this.message.message);
        }
      });

    }
  }
}


