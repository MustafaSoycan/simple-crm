import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: string[] = [];
  newNote: string = '';

  ngOnInit() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }

  addNote() {
    if (this.newNote.trim() !== '') {
      this.notes.push(this.newNote);
      this.newNote = '';
      this.saveNotesToLocalStorage();
    }
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotesToLocalStorage();
  }

  private saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}