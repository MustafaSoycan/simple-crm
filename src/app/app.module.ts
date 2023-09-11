import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { UserDetailsComponent } from './user-details/user-details.component';
import {MatMenuModule} from '@angular/material/menu';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { NotesComponent } from './notes/notes.component';
import { DialogAddNoteComponent } from './dialog-add-note/dialog-add-note.component';
import { DialogAddEventComponent } from './dialog-add-event/dialog-add-event.component';
import { CompanyComponent } from './company/company.component';
import { DialogAddCompanyComponent } from './dialog-add-company/dialog-add-company.component';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { MatSelectModule } from '@angular/material/select';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DialogEditCompanyAddressComponent } from './dialog-edit-company-address/dialog-edit-company-address.component';
import { DialogDeleteCompanyComponent } from './dialog-delete-company/dialog-delete-company.component';
import { DialogEditCompanyComponent } from './dialog-edit-company/dialog-edit-company.component';
import { DialogEditNoteComponent } from './dialog-edit-note/dialog-edit-note.component';
import { EventsComponent } from './events/events.component';
import { DatePipe } from '@angular/common';
import { EventDetailsComponent } from './event-details/event-details.component';
import { DialogDeleteEventComponent } from './dialog-delete-event/dialog-delete-event.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailsComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    LegalNoticeComponent,
    NotesComponent,
    DialogAddNoteComponent,
    DialogAddEventComponent,
    CompanyComponent,
    DialogAddCompanyComponent,
    DialogDeleteUserComponent,
    CompanyDetailsComponent,
    DialogEditCompanyAddressComponent,
    DialogDeleteCompanyComponent,
    DialogEditCompanyComponent,
    DialogEditNoteComponent,
    EventsComponent,
    EventDetailsComponent,
    DialogDeleteEventComponent  
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    DatePipe,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatSelectModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [DatePipe], // Hinzufügen des DatePipe
  bootstrap: [AppComponent]
})
export class AppModule { }
