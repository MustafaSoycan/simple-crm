import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getCountFromServer } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  noteCount: number = 0;
  eventCount: number = 0;
  companyCount: number = 0;
  currentTime: Date = new Date();

  showInstructions: boolean = false; // Neue Variable hinzugefügt


  constructor(private firestore: Firestore) { }

  async ngOnInit(): Promise<void> {
    let usersCollection = collection(this.firestore, 'users');
    const usersSnapshot = await getCountFromServer(usersCollection)
    console.log('count: ', usersSnapshot.data().count);
    this.userCount = usersSnapshot.data().count;

    let notesCollection = collection(this.firestore, 'notes');
    const notesSnapshot = await getCountFromServer(notesCollection)
    console.log('count: ', notesSnapshot.data().count);
    this.noteCount = notesSnapshot.data().count;

    let eventsCollection = collection(this.firestore, 'events');
    const eventsSnapshot = await getCountFromServer(eventsCollection)
    console.log('count: ', eventsSnapshot.data().count);
    this.eventCount = eventsSnapshot.data().count;

    let companysCollection = collection(this.firestore, 'companys');
    const companysSnapshot = await getCountFromServer(companysCollection)
    console.log('count: ', companysSnapshot.data().count);
    this.companyCount = companysSnapshot.data().count;



    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }


  updateTime(): void {
    this.currentTime = new Date();
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }
}