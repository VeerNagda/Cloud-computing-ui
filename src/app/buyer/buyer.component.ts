import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MessageModel} from "../Models/message-model";
import {SharedService} from "../shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  buyerForm: FormGroup;
  buyers: BuyerModel[] = []; // Array to store the fetched data
  private message: MessageModel = new MessageModel();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private router: Router) {
    this.buyerForm = this.formBuilder.group({
      plantId: ['', Validators.compose([Validators.required])],
      plantName: ['', Validators.compose([Validators.required])],
      contactPerson: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      gst: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.fetchBuyerData();
  }

  onSubmit() {
    if (this.buyerForm.valid) {
      this.http.post<MessageModel>(this.sharedService.apiUrl + "buyermaster/new-buyer", this.buyerForm.value).subscribe(result => {
        this.message = result;
        if (this.message.status == 200) {
          this.fetchBuyerData();
        } else if (this.message.status == 200) {
          console.log(this.message.message);
        }
      });

    }
  }

  fetchBuyerData() {
    this.http.get<BuyerModel[]>(this.sharedService.apiUrl + 'buyermaster/all-buyers').subscribe((data) => {
      this.buyers = data;
    });
  }

}

interface BuyerModel {
  plantId: string;
  plantName: string;
  contactPerson: string;
  address: string;
  gst: string;
  contactNumber: number;
}
