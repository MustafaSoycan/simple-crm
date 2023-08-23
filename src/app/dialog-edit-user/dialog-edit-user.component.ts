import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user!: User;
  userId!: string;
  loading: boolean = false;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore){}

  saveUser() {
    this.loading = true;
    let usersCollection = collection(this.firestore, 'users');
    let userDoc = doc(usersCollection, this.userId);
    updateDoc(userDoc, this.user.toJSON())
    .then(() =>{
      this.loading = false;
      this.dialogRef.close();
    })
  }
}
