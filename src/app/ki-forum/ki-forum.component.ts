import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ki-forum',
  templateUrl: './ki-forum.component.html',
  styleUrls: ['./ki-forum.component.css']
})
export class KiForumComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog(event: Event) {
    event
    const dialogRef = this.dialog.open(VideoDialog, {
      maxWidth: '800px'
    });
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'dialog-dialog',
  templateUrl: 'video-dialog.html',
})
export class VideoDialog {

  constructor(
    public dialogRef: MatDialogRef<VideoDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}