import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getCountFromServer, getDocs, query, where } from '@angular/fire/firestore';
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
    new Chart("monthlySales", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
    let companysCollection = collection(this.firestore, 'companys');
    const companysSnapshot = await getCountFromServer(companysCollection)
    console.log('Amount of Companys: ', companysSnapshot.data().count);
    this.companyCount = companysSnapshot.data().count;

    // Gibt die Company Namen und die monthlySales raus
    const companysQuerySnapshot = await getDocs(companysCollection);
    const companyData = companysQuerySnapshot.docs.map((doc) => {
      const company = doc.data() as Company;
      return {
        name: company.name,
        monthlySales: company.monthlySales
      };
    });
    // Company Namen und Verkaufszahlen in der Konsole
    console.log('Company Data:', companyData);
  }
}