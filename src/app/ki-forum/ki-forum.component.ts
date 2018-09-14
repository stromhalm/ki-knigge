import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ki-forum',
  templateUrl: './ki-forum.component.html',
  styleUrls: ['./ki-forum.component.css']
})
export class KiForumComponent implements OnInit {

  commentsCollection: AngularFirestoreCollection<Comment>;
  comments: Observable<Comment[]>;
  commentText: String;

  constructor(
    public dialog: MatDialog,
    public db: AngularFirestore,
    public http: HttpClient
    ) {
      this.commentsCollection = db.collection<Comment>('comments');
      this.comments = this.commentsCollection.valueChanges();
    }

  async tryToPublishComment() {

    var response = await this.http.post<ApiResponse>('http://localhost:5000/api/', {input: this.commentText}).toPromise();
    const dialogRef = this.dialog.open(VideoDialog, {maxWidth: '800px'});

    dialogRef.afterClosed().subscribe(async result => {
      if (!result) return;
      await this.commentsCollection.add({user: 'Anonymous', text: this.commentText});
      this.commentText = '';
    });
  }

  ngOnInit() {
  }
}

interface ApiResponse {
  input: String,
  cleanText: String,
  score: String
}

interface Comment {
  user: String,
  text: String
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