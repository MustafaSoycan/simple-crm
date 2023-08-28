import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddNoteComponent } from '../dialog-add-note/dialog-add-note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: any;
  showInstructions: boolean = false; // Neue Variable hinzugefügt

  constructor(public dialog: MatDialog, private firestore: Firestore) { }


  ngOnInit(): void {
    let notesCollection = collection(this.firestore, 'notes');

    collectionData(notesCollection, { idField: 'id' }).subscribe(notes => {
      this.notes = notes;
      console.log('Notes have been updated :)', notes)
    })
  }

  openDialog(){
    this.dialog.open(DialogAddNoteComponent);
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  deleteNote(noteId: string) {
    const noteDocRef = doc(this.firestore, 'notes', noteId);

    deleteDoc(noteDocRef)
      .then(() => {
        console.log('Note deleted successfully');
        this.notes = this.notes.filter((note: any) => note.id !== noteId);
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  }
}