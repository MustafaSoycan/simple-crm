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
    
    await this.getUserData();
    await this.getEventData();
    await this.getNoteData();
    await this.getCompanyData();

    

    console.log('This is a test if the companys are global:', this.companys)

    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    
  }


  updateTime(): void {
    this.currentTime = new Date();
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  renderFirstChart() {
    console.log('Companys Array:', this.companys);

    const labels = [];
    const data = [];

    for (let i = 0; i < this.companys.length; i++) {
        labels.push(this.companys[i]['name']);
        data.push(this.companys[i]['monthlySales'])
    }

    const barColors = ['rgb(63,81,181)', 'rgb(43,100,181)', 'rgb(33,150,243)', 'rgb(33,150,223)', 'rgb(232,67,35)' ]

    new Chart("monthlySales", {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Current Sales of the Companys',
                data: data, // Hier wird das Array mit den Daten eingefügt
                backgroundColor: barColors,
                borderWidth: 10,
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


renderSecondChart() {

  const labels = [];
    const data = [];

    for (let i = 0; i < this.companys.length; i++) {
        labels.push(this.companys[i]['name']);
        data.push(this.companys[i]['amountEmployees'])
    }
 
  const barColors = ['rgb(212,67,35)', 'orange', 'rgb(182,67,35)', 'rgb(250,215,8)']

  new Chart("employees", {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Amount of Employees of the Companys',
              data: data, 
              backgroundColor: barColors,
              borderWidth: 10
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
      console.log('Current Companys:', this.companys)
      this.renderFirstChart();
      this.renderSecondChart();
    })
  }


}