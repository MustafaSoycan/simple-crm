import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {


  users: any;

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    let usersCollection = collection(this.firestore, 'users');

    collectionData(usersCollection, { idField: 'id' }).subscribe(users => {
      this.users = users;
      console.log('Users have been updated :)', users)
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}