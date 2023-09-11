import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, collectionData, updateDoc } from '@angular/fire/firestore';
import { DialogAddCompanyComponent } from '../dialog-add-company/dialog-add-company.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  searchQuery: string = '';
  filteredCompanys: any;
  companys: any;
  showInstructions: boolean = false; // Neue Variable hinzugefügt


  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    let companysCollection = collection(this.firestore, 'companys');
    collectionData(companysCollection, { idField: 'id' }).subscribe(companys => {
      this.companys = companys;
      this.performSearch(); // Hier den Filter aufrufen
      console.log('Companys have been updated :)', companys)
    })
  }
  
  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  openDialog() {
    this.dialog.open(DialogAddCompanyComponent);
  }

  performSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredCompanys = this.companys;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCompanys = this.companys.filter((company: any) =>
        company.name.toLowerCase().includes(query)
      );
    }
  }
}
