import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MessageModel} from "../Models/message-model";
import {SharedService} from "../shared.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
})
export class BuyerComponent implements OnInit {
  buyerForm: FormGroup;
  updateForm: FormGroup;
  buyers: BuyerModel[] = []; // Array to store the fetched data
  selectedBuyer: BuyerModel | null = null;
  selectedBuyers: BuyerModel[] = [];
  message: MessageModel = new MessageModel();
  displayUpdateDialog: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.buyerForm = this.formBuilder.group({
      plantId: ['', Validators.compose([Validators.required])],
      plantName: ['', Validators.compose([Validators.required])],
      contactPerson: [''],
      address: [''],
      gst: ['', Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$")],
      contactNumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)])],
    });
    this.updateForm = this.formBuilder.group(Object.assign({}, this.buyerForm.value));
  }

  ngOnInit() {
    this.fetchBuyerData();
  }

  onNewInsert() {
    if (this.buyerForm.valid) {
      this.http.post<MessageModel>(this.sharedService.apiUrl + "buyer-master/new-buyer", this.buyerForm.value).subscribe(result => {
        this.message = result;
        if (this.message.status == 200) {
          this.messageService.add({severity: 'success', summary: 'Added', detail: this.message.message});
          this.fetchBuyerData();
          this.buyerForm.reset();
        } else if (this.message.status == 500) {
          this.messageService.add({severity: 'warn', summary: this.message.error, detail: this.message.message});
        }
      });

    }
  }

  fetchBuyerData() {
    this.http.get<BuyerModel[]>(this.sharedService.apiUrl + 'buyer-master/all-buyers').subscribe((data) => {
      this.buyers = data;
    });
  }

  updateBuyer(buyer: BuyerModel) {
    // Assign the selected buyer to the form for editing

    this.updateForm.setValue({
      plantId: buyer.plantId,
      plantName: buyer.plantName,
      contactPerson: buyer.contactPerson,
      address: buyer.address,
      gst: buyer.gst,
      contactNumber: buyer.contactNumber.toString(), // Convert to string if necessary
    });
    // Show the edit dialog box
    this.updateForm.get('plantId')?.disable();
    this.displayUpdateDialog = true;
  }

  deleteBuyer(buyer: BuyerModel) {
    this.selectedBuyer = buyer; // Store the selected buyer for deletion
    this.confirmationService.confirm({
      message: 'Do you wish to delete ' + buyer.plantId,
      header: 'Confirmation',
      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "buyer-master/delete-single-buyer", buyer).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
            this.fetchBuyerData();
            this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
    this.selectedBuyer = null; // Clear the selected buyer
  }


  confirmUpdate() {
    this.updateForm.get('plantId')?.enable();
    this.confirmationService.confirm({
      message: 'Do you wish to edit',
      header: 'Confirmation',
      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "buyer-master/edit-buyer", this.updateForm.value).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
            this.fetchBuyerData();
            this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
    this.selectedBuyer = null; // Clear the selected buyer

  }

  cancelUpdate() {
    this.displayUpdateDialog = false; // Close the delete confirmation dialog
    this.selectedBuyer = null; // Clear the selected buyer
  }

  isSelected(buyer: BuyerModel) {
    return this.selectedBuyer === buyer;
  }

  onBuyerSelectionChange(buyer: BuyerModel) {
    const index = this.selectedBuyers.indexOf(buyer);

    if (index === -1) {
      // Buyer is not in the array, so add it
      this.selectedBuyers.push(buyer);
    } else {
      // Buyer is already in the array, so remove it
      this.selectedBuyers.splice(index, 1);
    }

  }

  onSelectAllChange() {
    if (this.selectedBuyers != this.buyers && this.selectedBuyers.length === 0)
      this.selectedBuyers = [...this.buyers];
    else if (this.selectedBuyers.length != this.buyers.length)
      this.selectedBuyers = [...this.buyers];
    else
      this.selectedBuyers = [];
  }

  deleteMultipleBuyer() {
    let ids = this.selectedBuyers.map(buyer => buyer.plantId).join(', ');
    this.confirmationService.confirm({

      message: 'Do you wish to delete buyers ' + ids,
      header: 'Confirmation',
      accept: () => {
        // for receiving the data  from the server. Subscribe to wait for the data and Observe to get the data from thesubscribe
        this.http.post<MessageModel>(this.sharedService.apiUrl + "buyer-master/delete-multiple-buyer", this.selectedBuyers).subscribe(result => {
          this.message = result;
          // 200 means accepted/ working properly/ request was successful
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Delete', detail: this.message.message});
            this.selectedBuyers = []; // Send data and thus will Clear the selected buyer
            this.fetchBuyerData();
            // this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
  }
}

// using this to send and receive data to the server
interface BuyerModel {
  plantId: string;
  plantName: string;
  contactPerson: string;
  address: string;
  gst: string;
  contactNumber: number;
}
