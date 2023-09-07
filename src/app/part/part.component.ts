import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared.service";
import {MessageModel} from "../Models/message-model";

@Component({
    selector: 'app-part',
    templateUrl: './part.component.html',
    styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
    partForm: FormGroup;
    materialOptions: SelectItem[] = [{label: 'Select Material', value: null}];
    updateForm: FormGroup;
    parts: PartModel[] = []; // Array to store the fetched data
    selectedPart: PartModel | null = null;
    selectedParts: PartModel[] = [];
    message: MessageModel = new MessageModel();
    displayUpdateDialog: boolean = false;
    constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private confirmationService: ConfirmationService, private messageService: MessageService) {
        this.partForm = this.formBuilder.group({
            partNumber: ['', Validators.compose([Validators.required])],
            partName: ['', Validators.compose([Validators.required])],
            material1: ['', Validators.compose([Validators.required])],
            material2: [''],
        });
        this.updateForm = this.formBuilder.group(Object.assign({}, this.partForm.value));
    }

    ngOnInit() {
        this.fetchPartData();
        this.loadMaterialOptions();
    }

    loadMaterialOptions() {
        this.http.get<MaterialModel[]>(this.sharedService.apiUrl + "material-master/materials-for-parts").subscribe((result: MaterialModel[]) => {
            this.materialOptions = [
                {label: 'Select Material', value: null},
                ...result.map(item => ({label: item.name, value: item.id}))
            ];
        });
    }


    onNewInsert() {
        if (this.partForm.valid) {
            this.http.post<MessageModel>(this.sharedService.apiUrl + "part-master/new-part", this.partForm.value).subscribe(result => {
                this.message = result;
                if (this.message.status == 200) {
                    this.messageService.add({severity: 'success', summary: 'Added', detail: this.message.message});
                    this.fetchPartData();
                    this.partForm.reset();
                } else if (this.message.status == 500) {
                    this.messageService.add({severity: 'warn', summary: this.message.error, detail: this.message.message});
                }
            });
        }
    }
    fetchPartData() {
        this.http.get<PartModel[]>(this.sharedService.apiUrl + 'part-master/all-parts').subscribe((data) => {
            this.parts = data;
        });
    }

    updatePart(part: PartModel) {
        // Assign the selected part to the form for editing
        this.updateForm.setValue({
            partNumber: part.partNumber,
            partName: part.partName,
            material1: part.material1,
            material2: part.material2,
        });
        this.updateForm.get('partNumber')?.disable();

        // Show the edit dialog
        this.displayUpdateDialog = true;
    }

    deletePart(part: PartModel) {
        this.selectedPart = part; // Store the selected part for deletion
        this.confirmationService.confirm({
            message: 'Do you wish to delete ' + part.partNumber + " (" +part.partName + ")",
            header: 'Confirmation',
            accept: () => {
                this.http.post<MessageModel>(this.sharedService.apiUrl + "part-master/delete-single-part", part).subscribe(result => {
                    this.message = result;
                    if (this.message.status == 200) {
                        this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
                        this.fetchPartData();
                    } else if (this.message.status == 500) {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
                    }
                });
            },
        })
        this.selectedPart = null; // Clear the selected part
    }


    confirmUpdate() {
        this.updateForm.get('partNumber')?.enable();
        this.confirmationService.confirm({
            message: 'Do you wish to edit',
            header: 'Confirmation',

            accept: () => {
                this.http.post<MessageModel>(this.sharedService.apiUrl + "part-master/edit-part", this.updateForm.value).subscribe(result => {
                    this.message = result;
                    if (this.message.status == 200) {
                        this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
                        this.fetchPartData();
                        this.displayUpdateDialog = false;
                    } else if (this.message.status == 500) {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
                    }
                });
            },
        })
        this.selectedPart = null; // Clear the selected part

    }

    cancelUpdate() {
        this.displayUpdateDialog= false;
        this.selectedPart = null; // Clear the selected part
    }

    isSelected(part: PartModel) {
        return this.selectedPart === part;
    }

    onPartSelectionChange(part: PartModel) {
        const index = this.selectedParts.indexOf(part);

        if (index === -1) {
            // part is not in the array, so add it
            this.selectedParts.push(part);
        } else {
            // part is already in the array, so remove it
            this.selectedParts.splice(index, 1);
        }

    }

    onSelectAllChange() {
        if (this.selectedParts != this.parts && this.selectedParts.length === 0)
            this.selectedParts = [...this.parts];

        else if (this.selectedParts.length != this.parts.length)
            this.selectedParts = [...this.parts];
        else
            this.selectedParts = [];
        console.log(this.selectedParts);
    }

    deleteMultiplePart() {
        let ids = this.selectedParts.map(part => part.partNumber).join(', ');
        this.confirmationService.confirm({

            message: 'Do you wish to delete parts ' + ids,
            header: 'Confirmation',
            accept: () => {
                this.http.post<MessageModel>(this.sharedService.apiUrl + "part-master/delete-multiple-part", this.selectedParts).subscribe(result => {
                    this.message = result;
                    if (this.message.status == 200) {
                        this.messageService.add({severity: 'success', summary: 'Delete', detail: this.message.message});
                        this.selectedParts = []; // Clear the selected part
                        this.fetchPartData();
                        this.displayUpdateDialog = false;
                    } else if (this.message.status == 500) {
                        this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
                    }
                });
            },
        })
    }
}

interface PartModel {
    partNumber: string;
    partName: string;
    material1: string;
    material2: string;
}

interface MaterialModel {
    id: string;
    name: string;
}
