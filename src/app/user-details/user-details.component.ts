import { Component } from '@angular/core';
import { Firestore, collection, doc, docData, updateDoc, arrayUnion, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId: any = '';
  user: User = new User();
  companys: any;
  selectedCompanyId: string | null = null;

  showSuccessMessage = false;
  successMessage = '';

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Beim Initialisieren der Komponente
    this.route.paramMap.subscribe(paramMap => {
      // Parameter 'id' aus der URL-Route extrahieren
      this.userId = paramMap.get('id');
      console.log('Got Id', this.userId);
      // Benutzerdaten abrufen
      this.getUser();
    });

    let companysCollection = collection(this.firestore, 'companys');

    collectionData(companysCollection, { idField: 'id' }).subscribe(companys => {
      this.companys = companys;
      console.log('Companys have been updated :)', companys);
    });
  }

  getUser() {
    // Firestore-Sammlung 'users' referenzieren
    let usersCollection = collection(this.firestore, 'users');
    // Dokument mit der angegebenen 'userId' referenzieren
    let userDoc = doc(usersCollection, this.userId);

    // Daten des Dokuments abrufen und abonnieren
    docData(userDoc).subscribe((user: any) => {
      // Benutzerobjekt erstellen und mit den abgerufenen Daten aktualisieren
      this.user = new User(user);
      console.log('Retrieved User', this.user);
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DialogDeleteUserComponent, {
      width: '250px',
      data: { userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        console.log('User deleted successfully');
      } else {
        console.log('User deletion was canceled or closed');
      }
    });
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUser(){
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  assignUserToCompany() {
    if (!this.selectedCompanyId) {
      console.log('No company selected.');
      return;
    }

    const selectedCompany = this.companys.find((company: { id: string | null; }) => company.id === this.selectedCompanyId);

    if (selectedCompany) {
      const companyDocRef = doc(collection(this.firestore, 'companys'), selectedCompany.id);
      updateDoc(companyDocRef, {
        assignedUsers: arrayUnion(this.user.getFullName())
      })
        .then(() => {
          console.log('User assigned to company successfully');

          // Set the success message and show it
          this.successMessage = 'User assigned successfully, you can see it on the Companys Overview';
          this.showSuccessMessage = true;
        })
        .catch(error => {
          console.error('Error assigning user to company:', error);
        });
    }
  }

  // Methode zum Anrufen der Telefonnummer
  callPhoneNumber() {
    const phoneNumber = this.user.phoneNumber; // Die Telefonnummer des Benutzers hier einfügen, z.B., "+1234567890"

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
    const email = this.user.email; // Die E-Mail-Adresse des Benutzers hier einfügen
    const subject = 'Betreff deiner E-Mail'; // Den gewünschten Betreff hier einfügen
    const body = 'Hier ist der E-Mail-Text...'; // Den gewünschten E-Mail-Text hier einfügen
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // E-Mail-Anwendung öffnen
    window.location.href = mailtoLink;
  }
}