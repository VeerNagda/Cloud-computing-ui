import {Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import { TableModule } from 'primeng/table';
import {HttpClient} from "@angular/common/http";
import {MessageModel} from "../Models/message-model";
import {SharedService} from "../shared.service";
import {ConfirmationService, MessageService} from "primeng/api";

interface Supplier{
  name:string;
  address:string;
  contactNumber: string;
  gst:string;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  supplierForm: FormGroup;
  updateForm: FormGroup;
  suppliers: SupplierModel[] = []; // Array to store the fetched data
  selectedSupplier: SupplierModel | null = null;
  selectedSuppliers: SupplierModel[] = [];
  message: MessageModel = new MessageModel();
  displayUpdateDialog: boolean = false;


  // constructor(private formBuilder: FormBuilder) {
  //   this.supplierForm = this.formBuilder.group({
  //     name: ['', Validators.compose([Validators.required])],
  //     address: ['', Validators.compose([Validators.required])],
  //     contactNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
  //     gst: ['', Validators.compose([Validators.required])],
  //   });



  // onSubmit() {
  //   if (this.supplierForm.valid) {
  //     const formData = this.supplierForm.value;
  //     console.log(formData);
  //   }
  // }
// }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      contactNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      gst: ['', Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$")],
       });
    this.updateForm = this.formBuilder.group(Object.assign({}, this.supplierForm.value));
  }

  ngOnInit() {
    this.fetchSupplierData();
  }

  onNewInsert() {
    if (this.supplierForm.valid) {
      this.http.post<MessageModel>(this.sharedService.apiUrl + "supplier-master/new-supplier", this.supplierForm.value).subscribe(result => {
        this.message = result;
        if (this.message.status == 200) {
          this.messageService.add({severity: 'success', summary: 'Added', detail: this.message.message});
          this.fetchSupplierData();
          this.supplierForm.reset();
        } else if (this.message.status == 500) {
          this.messageService.add({severity: 'warn', summary: this.message.error, detail: this.message.message});
        }
      });

    }
  }

  fetchSupplierData() {
    this.http.get<SupplierModel[]>(this.sharedService.apiUrl + 'supplier-master/all-suppliers').subscribe((data) => {
      this.suppliers = data;
    });
  }

  updateSupplier(supplier: SupplierModel) {
    // Assign the selected supplier to the form for editing

    this.updateForm.setValue({
      name: supplier.name,
      address: supplier.address,
      contactNumber: supplier.contactNumber.toString(), // Convert to string if necessary
      gst: supplier.gst,
    });
    // Show the edit dialog box
    this.updateForm.get('name')?.disable();
    this.displayUpdateDialog = true;
  }

  deleteSupplier(supplier: SupplierModel) {
    this.selectedSupplier = supplier; // Store the selected supplier for deletion
    this.confirmationService.confirm({
      message: 'Do you wish to delete ' + supplier.name,
      header: 'Confirmation',
      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "supplier-master/delete-single-supplier", supplier).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
            this.fetchSupplierData();
            this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
    this.selectedSupplier = null; // Clear the selected supplier
  }


  confirmUpdate() {
    this.updateForm.get('name')?.enable();
    this.confirmationService.confirm({
      message: 'Do you wish to edit',
      header: 'Confirmation',
      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "supplier-master/edit-supplier", this.updateForm.value).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
            this.fetchSupplierData();
            this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
    this.selectedSupplier = null; // Clear the selected supplier

  }

  cancelUpdate() {
    this.displayUpdateDialog = false; // Close the delete confirmation dialog
    this.selectedSupplier = null; // Clear the selected supplier
  }

  isSelected(supplier: SupplierModel) {
    return this.selectedSupplier === supplier;
  }

  onSupplierSelectionChange(supplier: SupplierModel) {
    const index = this.selectedSuppliers.indexOf(supplier);

    if (index === -1) {
      // supplier is not in the array, so add it
      this.selectedSuppliers.push(supplier);
    } else {
      // supplier is already in the array, so remove it
      this.selectedSuppliers.splice(index, 1);
    }

  }

  onSelectAllChange() {
    if (this.selectedSuppliers != this.suppliers && this.selectedSuppliers.length === 0)
      this.selectedSuppliers = [...this.suppliers];
    else if (this.selectedSuppliers.length != this.suppliers.length)
      this.selectedSuppliers = [...this.suppliers];
    else
      this.selectedSuppliers = [];
  }

  deleteMultipleSupplier() {
    let ids = this.selectedSuppliers.map(supplier => supplier.name).join(', ');
    this.confirmationService.confirm({

      message: 'Do you wish to delete suppliers ' + ids,
      header: 'Confirmation',
      accept: () => {
        // for receiving the data  from the server. Subscribe to wait for the data and Observe to get the data from thesubscribe
        this.http.post<MessageModel>(this.sharedService.apiUrl + "supplier-master/delete-multiple-supplier", this.selectedSuppliers).subscribe(result => {
          this.message = result;
          // 200 means accepted/ working properly/ request was successful
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Delete', detail: this.message.message});
            this.selectedSuppliers = []; // Send data and thus will Clear the selected supplier
            this.fetchSupplierData();
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
interface SupplierModel {
  name: string;
  address: string;
  contactNumber: number;
  gst: string;
}
