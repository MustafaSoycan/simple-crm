import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-log-out',
  templateUrl: './dialog-log-out.component.html',
  styleUrls: ['./dialog-log-out.component.scss']
})
export class DialogLogOutComponent {
  loading: boolean = false;
  authService: any;


  constructor(public dialogRef: MatDialogRef<DialogLogOutComponent>, private router: Router) { }

  confirmLogout() {
    this.dialogRef.close('loggedOut');
    this.router.navigate(['/login']); 
  }


  cancelLogout() {
    this.dialogRef.close('canceled');
  }
}
