import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
  constructor(private router: Router, private firestore: Firestore) {}

  submitForm(event: Event) {
    event.preventDefault(); // Das verhindert das Standardverhalten des Formulars (Seitenneuladen)

    this.loading = true;
    // Führe hier deine Validierungen durch, bevor du die Registrierung durchführst
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email';
      return; // Beende die Methode, wenn die Validierung fehlschlägt
    }

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

  // Funktion zur Validierung der E-Mail-Adresse
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}