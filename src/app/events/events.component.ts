import { Component } from '@angular/core';
import { DialogAddEventComponent } from '../dialog-add-event/dialog-add-event.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  showInstructions: boolean = false;
  events: any;

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    let eventsCollection = collection(this.firestore, 'events');
    collectionData(eventsCollection, { idField: 'id' }).subscribe(events => {
      this.events = events;
      console.log('Events have been updated :)', events)
    })
  }




  openDialog() {
    this.dialog.open(DialogAddEventComponent);
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }
}
