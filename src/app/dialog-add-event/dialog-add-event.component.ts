import { Component} from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/models/event.class';

@Component({
  selector: 'app-dialog-add-event',
  templateUrl: './dialog-add-event.component.html',
  styleUrls: ['./dialog-add-event.component.scss']
})
export class DialogAddEventComponent {
  event = new Event();
  loading = false;
  users: any[] = []; // Hier wird die Userliste gespeichert
  companys: any[] = []; // Hier wird die Firmenliste gespeichert
  selectedUser: string | null = null;
  selectedCompany: string | null = null;
  
  constructor(public dialogRef: MatDialogRef<DialogAddEventComponent>, private firestore: Firestore) {
    // Laden Sie die Benutzerliste aus der Firestore-Datenbank
    let usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'id' }).subscribe(users => {
      this.users = users;
      console.log('Users have been loaded:', this.users);
    });




    // Ladet die Firmenliste aus der Firestore-Datenbank
    let companysCollection = collection(this.firestore, 'companys');
    collectionData(companysCollection, { idField: 'id' }).subscribe(companys => {
      this.companys = companys;
      console.log('Companys have been loaded:', this.companys);
    });
  }

  saveEvent() {
    console.log('Current Event is', this.event);
  
    // Fügen Sie den ausgewählten Benutzer zur assignedUsers-Liste hinzu
    if (this.selectedUser) {
      this.event.assignedUsers.push(this.selectedUser);
    }

    if (this.selectedCompany) {
      this.event.assignedCompanys.push(this.selectedCompany);
    }
  
    this.loading = true;
  
    let eventsCollection = collection(this.firestore, 'events');
    addDoc(eventsCollection, this.event.toJSON())
      .then(() => {
        this.loading = false;
        console.log('Event added successfully!');
        this.dialogRef.close();
      });
  }
}