import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { DialogLogOutComponent } from './dialog-log-out/dialog-log-out.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  @ViewChild('drawer') drawer: MatDrawer | any; // Referenz auf das MatDrawer-Element
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  // Diese Methode überprüft, ob der aktuelle Routerlink der Login-Routerlink ist
  showSidebar(): boolean {
    // Den aktuellen Routerlink abrufen
    const currentRoute = this.router.url;
  
    // Prüfen, ob es sich um den Login-Routerlink handelt
    return currentRoute !== '/login' && currentRoute !== '/register';
  }


  openLogOutDialog(){
    const dialog = this.dialog.open(DialogLogOutComponent)
  }
}