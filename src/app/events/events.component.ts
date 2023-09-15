import { Component } from '@angular/core';
import { DialogAddEventComponent } from '../dialog-add-event/dialog-add-event.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  showInstructions: boolean = false;
  events: any;
  searchQuery: string = '';
  filteredEvents: any;
  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    let eventsCollection = collection(this.firestore, 'events');
    collectionData(eventsCollection, { idField: 'id' }).subscribe(events => {
      this.events = events;
      this.performSearch(); // Hier den Filter aufrufen
      console.log('Events have been updated :)', events)
    })
  }




  openDialog() {
    this.dialog.open(DialogAddEventComponent);
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  performSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredEvents = this.events;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredEvents = this.events.filter((event: any) =>
        event.title.toLowerCase().includes(query)
      );
    }
  }
}
