import { Component } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId: any = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Beim Initialisieren der Komponente
    this.route.paramMap.subscribe(paramMap => {
      // Parameter 'id' aus der URL-Route extrahieren
      this.userId = paramMap.get('id');
      console.log('Got Id', this.userId);
      // Benutzerdaten abrufen
      this.getUser();
    });
  }

  getUser() {
    // Firestore-Sammlung 'users' referenzieren
    let usersCollection = collection(this.firestore, 'users');
    // Dokument mit der angegebenen 'userId' referenzieren
    let userDoc = doc(usersCollection, this.userId);

    // Daten des Dokuments abrufen und abonnieren
    docData(userDoc).subscribe((user: any) => {
      // Benutzerobjekt erstellen und mit den abgerufenen Daten aktualisieren
      this.user = new User(user);
      console.log('Retrieved User', this.user);
    });

  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUser(){
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}