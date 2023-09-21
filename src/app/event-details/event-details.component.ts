import { Component } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/models/event.class';
import { DialogDeleteEventComponent } from '../dialog-delete-event/dialog-delete-event.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

  eventId: any = '';
  event: Event = new Event();
  events: any;


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }


  ngOnInit(): void {
    // Beim Initialisieren der Komponente
    this.route.paramMap.subscribe(paramMap => {
      // Parameter 'id' aus der URL-Route extrahieren
      this.eventId = paramMap.get('id');
      console.log('Got Id', this.eventId);
      // Benutzerdaten abrufen
      this.getEvent();
    });
  }


  getEvent() {
    // Firestore-Sammlung 'users' referenzieren
    let eventsCollection = collection(this.firestore, 'events');
    // Dokument mit der angegebenen 'userId' referenzieren
    let eventDoc = doc(eventsCollection, this.eventId);

    // Daten des Dokuments abrufen und abonnieren
    docData(eventDoc).subscribe((event: any) => {
      // Benutzerobjekt erstellen und mit den abgerufenen Daten aktualisieren
      this.event = new Event(event);
      console.log('Retrieved Event', this.event);
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DialogDeleteEventComponent, {
      data: { eventId: this.eventId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        console.log('Event deleted successfully');
      } else {
        console.log('Event deletion was canceled or closed');
      }
    });
  }


  
}

