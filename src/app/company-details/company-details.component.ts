import { Component } from '@angular/core';
import { Firestore, collection, doc, docData, updateDoc, arrayUnion, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/models/company.class';
import { DialogDeleteCompanyComponent } from '../dialog-delete-company/dialog-delete-company.component';
import { DialogEditCompanyComponent } from '../dialog-edit-company/dialog-edit-company.component';
import { DialogEditCompanyAddressComponent } from '../dialog-edit-company-address/dialog-edit-company-address.component';



@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})

export class CompanyDetailsComponent {
  companyId: any = '';
  company: Company = new Company();
  companys: any;
  selectedUserId!: string | '';

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Beim Initialisieren der Komponente
    this.route.paramMap.subscribe(paramMap => {
      // Parameter 'id' aus der URL-Route extrahieren
      this.companyId = paramMap.get('id');
      console.log('Got Id', this.companyId);
      // Benutzerdaten abrufen
      this.getCompany();
    });

    let companysCollection = collection(this.firestore, 'companys');

    collectionData(companysCollection, { idField: 'id' }).subscribe(companys => {
      this.companys = companys;
      console.log('Companys have been updated :)', companys);
    });
  }

  getCompany() {
    // Firestore-Sammlung 'users' referenzieren
    let companysCollection = collection(this.firestore, 'companys');
    // Dokument mit der angegebenen 'userId' referenzieren
    let companyDoc = doc(companysCollection, this.companyId);

    // Daten des Dokuments abrufen und abonnieren
    docData(companyDoc).subscribe((company: any) => {
      // Benutzerobjekt erstellen und mit den abgerufenen Daten aktualisieren
      this.company = new Company(company);
      console.log('Retrieved Company', this.company);
    });
  }




  editCompany(){
    const dialog = this.dialog.open(DialogEditCompanyComponent)
    dialog.componentInstance.company = new Company(this.company.toJSON());
    dialog.componentInstance.companyId = this.companyId;
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditCompanyAddressComponent)
    dialog.componentInstance.company = new Company(this.company.toJSON());
    dialog.componentInstance.companyId = this.companyId;
  }



  openDeleteDialog() {
    const dialogRef = this.dialog.open(DialogDeleteCompanyComponent, {
      width: '250px',
      data: { companyId: this.companyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        console.log('User deleted successfully');
      } else {
        console.log('User deletion was canceled or closed');
      }
    });
  }


  // In Ihrer CompanyDetailsComponent:

deassignUserFromCompany(userId: string) {
  const updatedAssignedUsers = this.company.assignedUsers.filter(
    (assignedUserId: string) => assignedUserId !== userId
  );

  const companyDocRef = doc(collection(this.firestore, 'companys'), this.companyId);

  updateDoc(companyDocRef, {
    assignedUsers: updatedAssignedUsers
  })
    .then(() => {
      console.log('User de-assigned from company successfully');
      
      // Aktualisieren Sie auch das lokale company-Objekt
      this.company.assignedUsers = updatedAssignedUsers;
    })
    .catch(error => {
      console.error('Error de-assigning user from company:', error);
    });
}



// Methode zum Anrufen der Telefonnummer
callPhoneNumber() {
  const phoneNumber = this.company.phoneNumber; // Die Telefonnummer des Benutzers hier einfügen, z.B., "+1234567890"

  // Überprüfen, ob die `tel:`-URL-Unterstützung verfügbar ist
  if ('href' in HTMLAnchorElement.prototype) {
    const telLink = document.createElement('a');
    telLink.href = `tel:${phoneNumber}`;

    // Den erstellten Link klicken, um die Anrufanwendung zu öffnen
    telLink.click();
  } else {
    // Fallback: Wenn die `tel:`-URL-Unterstützung nicht verfügbar ist, einfach die Nummer anzeigen
    alert(`Bitte rufen Sie die Nummer ${phoneNumber} manuell an.`);
  }
}

 // Methode zum Öffnen der E-Mail-Anwendung
 sendEmail() {
  const email = this.company.email; // Die E-Mail-Adresse des Benutzers hier einfügen
  const subject = 'Betreff deiner E-Mail'; // Den gewünschten Betreff hier einfügen
  const body = 'Hier ist der E-Mail-Text...'; // Den gewünschten E-Mail-Text hier einfügen
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  // E-Mail-Anwendung öffnen
  window.location.href = mailtoLink;
}
}