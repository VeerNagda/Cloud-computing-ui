import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageModel} from "../Models/message-model";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-materials',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materialForm: FormGroup;
  updateForm: FormGroup;
  materials: MaterialModel[] = []; // Array to store the fetched data
  selectedMaterial: MaterialModel | null = null;
  selectedMaterials: MaterialModel[] = [];
  message: MessageModel = new MessageModel();
  displayUpdateDialog: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private sharedService: SharedService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.materialForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      grade: [''],
      width: ['', Validators.compose([Validators.pattern(/^\d+(\.\d{1,2})?$/)])],
      thickness: ['', Validators.compose([Validators.pattern(/^\d+(\.\d{1,2})?$/)])]
    });
    this.updateForm = this.formBuilder.group(Object.assign({}, this.materialForm.value));
  }

  ngOnInit() {
    this.fetchMaterialData();
  }

  onNewInsert() {
    if (this.materialForm.valid) {
      this.http.post<MessageModel>(this.sharedService.apiUrl + "material-master/new-material", this.materialForm.value).subscribe(result => {
        this.message = result;
        if (this.message.status == 200) {
          this.messageService.add({severity: 'success', summary: 'Added', detail: this.message.message});
          this.fetchMaterialData();
          this.materialForm.reset();
        } else if (this.message.status == 500) {
          this.messageService.add({severity: 'warn', summary: this.message.error, detail: this.message.message});
        }
      });
    }
  }

  fetchMaterialData() {
    this.http.get<MaterialModel[]>(this.sharedService.apiUrl + 'material-master/all-materials').subscribe((data) => {
      this.materials = data;
    });
  }

  updateMaterial(material: MaterialModel) {
    // Assign the selected material to the form for editing
    this.updateForm.setValue({
      id: material.id,
      name: material.name,
      grade: material.grade,
      width: material.width,
      thickness: material.thickness,
    });
    this.updateForm.get('id')?.disable();

    // Show the edit dialog
    this.displayUpdateDialog = true;
  }

  deleteMaterial(material: MaterialModel) {
    this.selectedMaterial = material; // Store the selected material for deletion
    this.confirmationService.confirm({
      message: 'Do you wish to delete ' + material.id,
      header: 'Confirmation',
      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "material-master/delete-single-material", material).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
            this.fetchMaterialData();
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
    this.selectedMaterial = null; // Clear the selected material
  }


  confirmUpdate() {
    this.updateForm.get('id')?.enable();
    this.confirmationService.confirm({
      message: 'Do you wish to edit',
      header: 'Confirmation',

      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "material-master/edit-material", this.updateForm.value).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Updated', detail: this.message.message});
            this.fetchMaterialData();
            this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
    this.selectedMaterial = null; // Clear the selected material

  }

  cancelUpdate() {
    this.displayUpdateDialog= false;
    this.selectedMaterial = null; // Clear the selected material
  }

  isSelected(material: MaterialModel) {
    return this.selectedMaterial === material;
  }

  onMaterialSelectionChange(material: MaterialModel) {
    const index = this.selectedMaterials.indexOf(material);

    if (index === -1) {
      // material is not in the array, so add it
      this.selectedMaterials.push(material);
    } else {
      // material is already in the array, so remove it
      this.selectedMaterials.splice(index, 1);
    }

  }

  onSelectAllChange() {
    if (this.selectedMaterials != this.materials && this.selectedMaterials.length === 0)
      this.selectedMaterials = [...this.materials];

    else if (this.selectedMaterials.length != this.materials.length)
      this.selectedMaterials = [...this.materials];
    else
      this.selectedMaterials = [];
    console.log(this.selectedMaterials);
  }

  deleteMultipleMaterial() {
    let ids = this.selectedMaterials.map(material => material.id).join(', ');
    this.confirmationService.confirm({

      message: 'Do you wish to delete materials ' + ids,
      header: 'Confirmation',
      accept: () => {
        this.http.post<MessageModel>(this.sharedService.apiUrl + "material-master/delete-multiple-material", this.selectedMaterials).subscribe(result => {
          this.message = result;
          if (this.message.status == 200) {
            this.messageService.add({severity: 'success', summary: 'Delete', detail: this.message.message});
            this.selectedMaterials = []; // Clear the selected material
            this.fetchMaterialData();
            this.displayUpdateDialog = false;
          } else if (this.message.status == 500) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: this.message.message});
          }
        });
      },
    })
  }


}

interface MaterialModel {
  id: string;
  name: string;
  grade: string;
  width: string;
  thickness: string;
}
