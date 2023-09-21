import { Component } from '@angular/core';
import { Company } from 'src/models/company.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-company',
  templateUrl: './dialog-add-company.component.html',
  styleUrls: ['./dialog-add-company.component.scss']
})
export class DialogAddCompanyComponent {
  company = new Company();
  loading = false;
  monthlySales!: number;
  amountEmployees!: number;

  constructor(public dialogRef: MatDialogRef<DialogAddCompanyComponent>, private firestore: Firestore) { }


  saveCompany() {
    console.log('Current Company is', this.company)
    this.loading = true;

    // Generiere einen zufälligen 5-stelligen Betrag für monthlySales
    this.company.monthlySales = this.generateMonthlySales();

    // Generiere eine zufällige Nummber für die Employees
    this.company.amountEmployees = this.generateAmountEmployees();

    let companysCollection = collection(this.firestore, 'companys');
    addDoc(companysCollection, this.company.toJSON())
      .then(() => {
        this.loading = false;
        console.log('Company added successfully!');
        this.dialogRef.close();
      })
  }

  // Methode zum Generieren eines zufälligen 5-stelligen Betrags
  private generateMonthlySales(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  // Methode zum Generieren eines zufälligen 5-stelligen Betrags
  private generateAmountEmployees(): number {
    return Math.floor(10000 + Math.random() * 4000);
  }

  canAddCompany(): boolean {
    return (
      this.nameForm.valid &&
      this.emailForm.valid &&
      this.phoneNumberForm.valid &&
      this.streetAndHouseNumberForm.valid &&
      this.zipCodeForm.valid &&
      this.cityForm.valid
    );
  }

    // DIESER CODE IST FÜR DIE VALIDIERUNG DES FORMULARES

  // FIRST NAME VALIDIERUNG (FORM CONTROL)
  nameForm = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  getNameErrorMessage() {
    if (this.nameForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.nameForm.hasError('minlength')
      ? 'Must be at least 2 characters long'
      : '';
  }


  // EMAIL VALIDIERUNG
  emailForm = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  getEmailErrorMessage() {
    if (this.emailForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailForm.hasError('email') ? 'Not a valid email' : '';
  }

  // PHONE NUMBER VALIDIERUNG
  phoneNumberForm = new FormControl('', [
    Validators.pattern(/^\+?[0-9\s]+$/), // Erlaubt Zahlen und Leerzeichen, optional ein '+' am Anfang
  ]);
  getPhoneNumberErrorMessage() {
    return this.phoneNumberForm.hasError('pattern')
      ? 'Invalid phone number'
      : '';
  }

  // STREET + HOUSENUMBER VALIDIERUNG
  streetAndHouseNumberForm = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  getStreetAndHouseNumberErrorMessage() {
    if (this.streetAndHouseNumberForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.streetAndHouseNumberForm.hasError('minlength')
      ? 'Must be at least 2 characters long'
      : '';
  }

  // ZIPCODE VALIDIERUNG
  zipCodeForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{5}$/), // Erlaubt genau 5 Ziffern
  ]);
  getZipCodeErrorMessage() {
    if (this.zipCodeForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.zipCodeForm.hasError('pattern') ? 'Invalid zip code' : '';
  }

  // CITY VALIDIERUNG
  cityForm = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  getCityErrorMessage() {
    if (this.cityForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.cityForm.hasError('minlength')
      ? 'Must be at least 2 characters long'
      : '';
  }
}
