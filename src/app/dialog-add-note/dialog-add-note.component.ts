import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/models/note.class';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrls: ['./dialog-add-note.component.scss']
})
export class DialogAddNoteComponent {

  note = new Note();
  newNote: string = '';
  loading = false;

  constructor(public dialog: MatDialogRef<DialogAddNoteComponent>, private firestore: Firestore) { }


  saveNote(){
    
    console.log('Current Note is', this.note)
    this.loading = true;

    let notesCollection = collection(this.firestore, 'notes');
    addDoc(notesCollection, this.note.toJSON())
      .then(() => {
        this.loading = false;
        console.log('Note added successfully!');
        this.dialog.close();
      })
  }
  
}
