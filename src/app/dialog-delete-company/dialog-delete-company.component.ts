import { Component, Inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { Company } from 'src/models/company.class';

@Component({
  selector: 'app-dialog-delete-company',
  templateUrl: './dialog-delete-company.component.html',
  styleUrls: ['./dialog-delete-company.component.scss']
})
export class DialogDeleteCompanyComponent {
  companys: any;
  companyId: any | undefined;
  loading: boolean = false;
  company: Company = new Company();



  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private firestore: Firestore, private router: Router) 
  {this.companyId = data.companyId;} // Die userId aus den Dialogdaten übernehmen 


  deleteCompany() {
    const companysCollection = collection(this.firestore, 'companys');
    const companyDoc = doc(companysCollection, this.companyId);
  
    deleteDoc(companyDoc)
      .then(() => {
        console.log('Company deleted successfully');
        // Navigiere zur Benutzerseite zurück
        this.dialogRef.close('deleted');
        this.router.navigate(['company']); // Hier '/users' durch deinen tatsächlichen Pfad ersetzen
      })
      .catch(error => {
        console.error('Error deleting company:', error);
        // Handle error if necessary
      });
  }
}


