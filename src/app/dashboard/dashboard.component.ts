import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, getCountFromServer, getDocs, query, where } from '@angular/fire/firestore';
import { Chart, registerables } from 'node_modules/chart.js';
import { Company } from 'src/models/company.class';
import { DatePipe } from '@angular/common';

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
  users: any;

  frontendDeveloperCount: number = 0;
  backendDeveloperCount: number = 0;
  projectManagerCount: number = 0;
  systemAdministratorCount: number = 0;
  dataAnalystCount: number = 0;

  constructor(private firestore: Firestore, private datePipe: DatePipe) { }

  async ngOnInit(): Promise<void> {

    await this.getUserData();
    await this.getEventData();
    await this.getNoteData();
    await this.getCompanyData();

    this.updateUserCountsByJobTitle();


   

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

    const barColors = ['#C2185B', '#F8BBD0', '#E91E63', '#BDBDBD', '#212121']

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

    const barColors = ['#212121', '#757575', '#E91E63', '#F8BBD0', '#C2185B']

    new Chart("employees", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Amount of Employees of the Companys',
          data: data,
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

  renderThirdChart() {
    // Zerstöre die vorherige Chart.js-Instanz, falls vorhanden


  Chart.getChart("pieChart")?.destroy();

    new Chart("pieChart", {
      type: 'doughnut',
      data: {
        labels: ['Hoch', 'Mittel', 'Niedrig'],
        datasets: [{
          data: [30, 50, 20], // Künstliche Daten für die Umsatzklasse
          backgroundColor: ['rgb(63,81,181)', 'rgb(43,100,181)', 'rgb(33,150,243)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }


  async getUserData() {
    let usersCollection = collection(this.firestore, 'users');
    const usersSnapshot = await getCountFromServer(usersCollection)
    console.log('Amount of Users: ', usersSnapshot.data().count);
    this.userCount = usersSnapshot.data().count;

    // RUFT DATEN DER COMPANYS AB
    collectionData(usersCollection, { idField: 'id' }).subscribe(users => {
      this.users = users;
      console.log('Users:', this.users)
      this.renderThirdChart();
    })
  }

  async getEventData() {
    let eventsCollection = collection(this.firestore, 'events');
    const eventsSnapshot = await getCountFromServer(eventsCollection)
    console.log('Amount of events: ', eventsSnapshot.data().count);
    this.eventCount = eventsSnapshot.data().count;
  }

  async getNoteData() {
    let notesCollection = collection(this.firestore, 'notes');
    const notesSnapshot = await getCountFromServer(notesCollection)
    console.log('Amount of Notes: ', notesSnapshot.data().count);
    this.noteCount = notesSnapshot.data().count;
  }

  async getCompanyData() {
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
      this.renderThirdChart();
    })
  }


  async updateUserCountsByJobTitle() {
    // Abfrage für Frontend Developer
    const frontendDeveloperQuery = query(collection(this.firestore, 'users'), where('jobTitle', '==', 'Frontend Developer'));
    const frontendDeveloperSnapshot = await getDocs(frontendDeveloperQuery);
    this.frontendDeveloperCount = frontendDeveloperSnapshot.size;

    // Abfrage für Backend Developer
    const backendDeveloperQuery = query(collection(this.firestore, 'users'), where('jobTitle', '==', 'Backend Developer'));
    const backendDeveloperSnapshot = await getDocs(backendDeveloperQuery);
    this.backendDeveloperCount = backendDeveloperSnapshot.size;

    // Abfrage für Project Manager
    const projectManagerQuery = query(collection(this.firestore, 'users'), where('jobTitle', '==', 'Project Manager'));
    const projectManagerSnapshot = await getDocs(projectManagerQuery);
    this.projectManagerCount = projectManagerSnapshot.size;

    // Abfrage für Project Manager
    const systemAdministratorQuery = query(collection(this.firestore, 'users'), where('jobTitle', '==', 'System Administrator'));
    const systemAdministratorSnapshot = await getDocs(systemAdministratorQuery);
    this.systemAdministratorCount = systemAdministratorSnapshot.size;

    // Abfrage für Project Manager
    const dataAnalystQuery = query(collection(this.firestore, 'users'), where('jobTitle', '==', 'Data Analyst'));
    const dataAnalystSnapshot = await getDocs(dataAnalystQuery);
    this.dataAnalystCount = dataAnalystSnapshot.size;
  }

   getFormattedDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    return formattedDate;
  }
}