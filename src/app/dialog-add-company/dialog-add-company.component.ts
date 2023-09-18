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
  monthlySales!: number;

  constructor(public dialogRef: MatDialogRef<DialogAddCompanyComponent>, private firestore: Firestore) { }


  saveCompany() {
    console.log('Current Company is', this.company)
    this.loading = true;

    // Generiere einen zufälligen 5-stelligen Betrag für monthlySales
    this.company.monthlySales = this.generateRandomFiveDigitNumber();

    let companysCollection = collection(this.firestore, 'companys');
    addDoc(companysCollection, this.company.toJSON())
      .then(() => {
        this.loading = false;
        console.log('Company added successfully!');
        this.dialogRef.close();
      })
  }

  // Methode zum Generieren eines zufälligen 5-stelligen Betrags
  private generateRandomFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }
}
