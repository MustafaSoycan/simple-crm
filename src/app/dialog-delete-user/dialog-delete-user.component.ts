import { Component, Inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent {
  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private firestore: Firestore, private router: Router) 
  {this.userId = data.userId; // Die userId aus den Dialogdaten übernehmen 
}

  users: any;
  userId: any | undefined;
  loading: boolean = false;
  user: User = new User();

  deleteUser() {
    const usersCollection = collection(this.firestore, 'users');
    const userDoc = doc(usersCollection, this.userId);
  
    deleteDoc(userDoc)
      .then(() => {
        console.log('User deleted successfully');
        // Navigiere zur Benutzerseite zurück
        this.dialogRef.close('deleted');
        this.router.navigate(['user']); // Hier '/users' durch deinen tatsächlichen Pfad ersetzen
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        // Handle error if necessary
      });
  }


}
