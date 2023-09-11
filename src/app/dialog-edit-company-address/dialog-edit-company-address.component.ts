import { Component } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { DialogAddCompanyComponent } from '../dialog-add-company/dialog-add-company.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/models/company.class';

@Component({
  selector: 'app-dialog-edit-company-address',
  templateUrl: './dialog-edit-company-address.component.html',
  styleUrls: ['./dialog-edit-company-address.component.scss']
})
export class DialogEditCompanyAddressComponent {
  loading: boolean = false;
  company!: Company;
  companyId: string | undefined;
  
  constructor(public dialogRef: MatDialogRef<DialogAddCompanyComponent>, private firestore: Firestore) { }

  saveCompany() {
    this.loading = true;
    let companysCollection = collection(this.firestore, 'companys');
    let companyDoc = doc(companysCollection, this.companyId);
    updateDoc(companyDoc, this.company.toJSON())
    .then(() =>{
      this.loading = false;
      this.dialogRef.close();
    })
  }
}
