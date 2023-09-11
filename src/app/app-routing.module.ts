import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { NotesComponent } from './notes/notes.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/:id', component: EventDetailsComponent},
  {path: 'legal-notice', component: LegalNoticeComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'company/:id', component: CompanyDetailsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
