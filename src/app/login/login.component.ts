import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  hide = true;
  constructor(private router: Router, private firestore: Firestore) {}

  login() {
    this.loading = true;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      
      .then((userCredential) => {
        // Signed in
        this.loading = false;
        console.log('User loged in successfully') 
        const user = userCredential.user;
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.loading = false;
        const errorCode = error.code;
        this.errorMessage = 'Uncorrect Information. Please check your email and password';
        
      });
  }
}
