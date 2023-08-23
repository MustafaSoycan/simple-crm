import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: User;
  loading: boolean = false;
  userId: string | undefined;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore) { }

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
