import { Component, Inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Event } from 'src/models/event.class';

@Component({
  selector: 'app-dialog-delete-event',
  templateUrl: './dialog-delete-event.component.html',
  styleUrls: ['./dialog-delete-event.component.scss']
})
export class DialogDeleteEventComponent {

  events: any;
  eventId: any | undefined;
  loading: boolean = false;
  event: Event = new Event();





  constructor(public dialogRef: MatDialogRef<DialogDeleteEventComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private firestore: Firestore, private router: Router) 
  {this.eventId = data.eventId;} // Die userId aus den Dialogdaten übernehmen 

  deleteEvent() {
    const eventsCollection = collection(this.firestore, 'events');
    const eventDoc = doc(eventsCollection, this.eventId);
  
    deleteDoc(eventDoc)
      .then(() => {
        console.log('Event deleted successfully');
        // Navigiere zur Benutzerseite zurück
        this.dialogRef.close('deleted');
        this.router.navigate(['events']); 
      })
      .catch(error => {
        console.error('Error deleting Event:', error);
        // Handle error if necessary
      });
  }
}
