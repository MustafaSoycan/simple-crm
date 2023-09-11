import { Component } from '@angular/core';
import { Company } from 'src/models/company.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-company',
  templateUrl: './dialog-add-company.component.html',
  styleUrls: ['./dialog-add-company.component.scss']
})
export class DialogAddCompanyComponent {
  company = new Company();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddCompanyComponent>, private firestore: Firestore){}


  saveCompany(){
    console.log('Current Company is', this.company)
    this.loading = true;

    let companysCollection = collection(this.firestore, 'companys');
    addDoc(companysCollection, this.company.toJSON())
      .then(() => {
        this.loading = false;
        console.log('Company added successfully!');
        this.dialogRef.close();
      })
  }
}
