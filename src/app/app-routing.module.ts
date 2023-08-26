import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'legal-notice', component: LegalNoticeComponent},
  {path: 'notes', component: NotesComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
