import { Component } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/models/company.class';
import { DialogAddCompanyComponent } from '../dialog-add-company/dialog-add-company.component';

@Component({
  selector: 'app-dialog-edit-company',
  templateUrl: './dialog-edit-company.component.html',
  styleUrls: ['./dialog-edit-company.component.scss']
})
export class DialogEditCompanyComponent {
  company!: Company;
  companyId!: string;
  loading: boolean = false;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogAddCompanyComponent>, private firestore: Firestore){}

  saveCompany() {
    this.loading = true;
    let companysCollection = collection(this.firestore, 'companys');
    let userDoc = doc(companysCollection, this.companyId);
    updateDoc(userDoc, this.company.toJSON())
    .then(() =>{
      this.loading = false;
      this.dialogRef.close();
    })
  }
}
