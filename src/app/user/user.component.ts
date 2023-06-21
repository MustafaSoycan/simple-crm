import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user = new User();
  usersCollection: any; // Typisieren Sie dies entsprechend der Firestore-Sammlung

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit(): void {
    this.usersCollection = collection(this.firestore, 'users');
    updateDoc(this.usersCollection, this.user.toJSON())
      .then(() => {
        console.log('User updated successfully!');
      });

    // Überwachen von Änderungen im Array
    this.usersCollection.valueChanges().subscribe((changes: any[]) => {
      console.log('Array geändert:', changes);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}