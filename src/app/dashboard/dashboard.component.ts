import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, getCountFromServer, getDocs, query, where } from '@angular/fire/firestore';
import { Chart, registerables } from 'node_modules/chart.js';
import { Company } from 'src/models/company.class';
Chart.register(...registerables)

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

  newUserCount: number = 0; // Anzahl der neuen Benutzer diesen Monat

  showInstructions: boolean = false; // Neue Variable hinzugefügt

  companys: any;

  constructor(private firestore: Firestore) { }

  async ngOnInit(): Promise<void> {
    
    this.getUserData();
    this.getEventData();
    this.getNoteData();
    this.getCompanyData();

    

    

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.renderFirstChart();
  }


  updateTime(): void {
    this.currentTime = new Date();
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  renderFirstChart(){
    
    console.log('Companys Array:', this.companys)

    new Chart("monthlySales", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Current Sales of the Companys',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  async getUserData(){
    let usersCollection = collection(this.firestore, 'users');
    const usersSnapshot = await getCountFromServer(usersCollection)
    console.log('Amount of Users: ', usersSnapshot.data().count);
    this.userCount = usersSnapshot.data().count;
  }

  async getEventData(){
    let eventsCollection = collection(this.firestore, 'events');
    const eventsSnapshot = await getCountFromServer(eventsCollection)
    console.log('Amount of events: ', eventsSnapshot.data().count);
    this.eventCount = eventsSnapshot.data().count;
  }

  async getNoteData(){
    let notesCollection = collection(this.firestore, 'notes');
    const notesSnapshot = await getCountFromServer(notesCollection)
    console.log('Amount of Notes: ', notesSnapshot.data().count);
    this.noteCount = notesSnapshot.data().count;
  }
 
  async getCompanyData(){
    // GREIFT AUF DATENBANK IN FIRESTORE ZU
    let companysCollection = collection(this.firestore, 'companys');

    // ZÄHLT DIE ANZAHL DER DATEN IN DER COLLECTION
    const companysSnapshot = await getCountFromServer(companysCollection)
    console.log('Amount of Companys: ', companysSnapshot.data().count);
    this.companyCount = companysSnapshot.data().count;

   // RUFT DATEN DER COMPANYS AB
    collectionData(companysCollection, { idField: 'id' }).subscribe(companys => {
      this.companys = companys;
      console.log('Companys:', companys)
    })
    
  }
}