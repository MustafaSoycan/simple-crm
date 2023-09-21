import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;
  registrationDate!: Date;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore) {
    this.birthDate = new Date(); // Zum Beispiel hier initialisieren
    this.registrationDate = new Date();
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.user.registrationDate = this.registrationDate.getTime();
    console.log('Registration Date:', this.registrationDate);
    console.log('Current user is', this.user)
    this.loading = true;

    let usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, this.user.toJSON())
      .then(() => {
        this.loading = false;
        console.log('User added successfully!');
        this.dialogRef.close();
      })
  }

  canAddUser(): boolean {
    return (
      this.firstNameForm.valid &&
      this.lastNameForm.valid &&
      this.emailForm.valid &&
      this.phoneNumberForm.valid &&
      this.birthDateForm.valid &&
      this.streetAndHouseNumberForm.valid &&
      this.zipCodeForm.valid &&
      this.cityForm.valid
    );
  }

    // DIESER CODE IST FÜR DIE VALIDIERUNG DES FORMULARES

  // FIRST NAME VALIDIERUNG (FORM CONTROL)
  firstNameForm = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  getFirstNameErrorMessage() {
    if (this.firstNameForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.firstNameForm.hasError('minlength')
      ? 'Must be at least 2 characters long'
      : '';
  }

  // LAST NAME VALIDIERUNG
  lastNameForm = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  getlastNameErrorMessage() {
    if (this.lastNameForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.lastNameForm.hasError('minlength')
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


  // BIRTH DATE VALIDIERUNG
  birthDateForm = new FormControl('', [
    Validators.required,
  ]);
  getBirthDateErrorMessage() {
    if (this.birthDateForm.hasError('required')) {
      return 'You must enter a birth date';
    }
    return '';
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