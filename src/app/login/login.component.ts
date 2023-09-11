import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http"
import {SharedService} from "../shared.service";
import {MessageModel} from "../Models/message-model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  private message: MessageModel = new MessageModel();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private router: Router, private messageService: MessageService, private cookieService: CookieService) {
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
          this.messageService.add({severity: 'success', summary: 'Success', detail: this.message.message});
          setTimeout(()=>{
            this.cookieService.set("role",this.message.error, {sameSite: "Lax", path:"/"})
            this.router.navigate(['/buyer-master']).then(r => console.log(r));
          }, 1000);
        }
        else if (this.message.status == 401){
          this.messageService.add({severity: 'warn', summary: this.message.error, detail: this.message.message});
        }
      });

    }
  }
}


