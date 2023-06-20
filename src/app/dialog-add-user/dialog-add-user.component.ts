import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore){}

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
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
}