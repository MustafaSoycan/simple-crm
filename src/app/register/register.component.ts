import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(private router: Router, private firestore: Firestore) { }

  submitForm(event: Event) {
    event.preventDefault(); // Das verhindert das Standardverhalten des Formulars (Seitenneuladen)

    this.loading = true;


    const auth = getAuth();

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Registrierung erfolgreich
        this.loading = false;
        const user = userCredential.user;
        console.log('User registered successfully')
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Bei einem Fehler die Fehlermeldung anzeigen
        this.loading = false;
        this.errorMessage = 'User could not be registered';
      });
  }


  // EMAIL VALIDIERUNG
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  getEmailErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }



  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6), // Mindestens 6 Zeichen für das Passwort
  ]);
  getPasswordErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.passwordFormControl.hasError('minlength')
      ? 'Must be at least 6 characters'
      : '';
  }


  canAddUser(): boolean {
    return (
      this.emailFormControl.valid &&
      this.passwordFormControl.valid 
    );
  }
}
