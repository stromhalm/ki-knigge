import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ki-forum',
  templateUrl: './ki-forum.component.html',
  styleUrls: ['./ki-forum.component.css']
})
export class KiForumComponent {

  commentsCollection: AngularFirestoreCollection<Comment>;
  comments: Observable<Comment[]>;
  commentText: string;

  constructor(
    public dialog: MatDialog,
    public db: AngularFirestore,
    public http: HttpClient
    ) {
      this.commentsCollection = db.collection<Comment>('comments', ref => ref.orderBy('created'));
      this.comments = this.commentsCollection.valueChanges();
    }

  async tryToPublishComment() {

    var response = await this.http.post<ApiResponse>('http://localhost:5000/api/', {input: this.commentText}).toPromise();
    var published = true;

    if (response.score < 50) {
      var dialogRef = this.dialog.open(VideoDialog, {width: '800px'});
      var result = await dialogRef.afterClosed().toPromise();
      published = false;
      if (!result) return;
    }
    
    this.commentsCollection.add({
      user: 'Anonymous',
      text: this.commentText,
      created: new Date(),
      published: published
    });
    this.commentText = '';
  }
}

interface ApiResponse {
  input: string,
  cleanText: string,
  score: number,
}

interface Comment {
  user: string,
  text: string,
  created: Date,
  published: boolean
}

@Component({
  selector: 'dialog-dialog',
  templateUrl: 'video-dialog.html',
})
export class VideoDialog implements OnInit {

  public videoCompleted: boolean = false;

  constructor(public dialogRef: MatDialogRef<VideoDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('window:videoEvent', ['$event'])
  videoEvent(event) {
    switch(event.detail.name) {
      case "complete":
        this.videoCompleted = true;
      break;
    }
  }

  ngOnInit() {
    var alertComponent = this;

    // Register event listener
    window.alertMe = function(player, event, data) {
      window.dispatchEvent(new CustomEvent('videoEvent', {detail: {player: player, name: event, data: data}}));
    }

    // Initialize video player
    var _js3qi = setInterval(function () {
      clearInterval(_js3qi);
      var js3qVideoPlayer = new js3q({
          'data-id': 'd556e477-b82f-11e8-ae4b-0cc47a188158',
          'container': 'video-player',
          'sticky': true,
          'playlistbar' : true,
          'jscallback' : 'alertMe'
      });
      js3qVideoPlayer.init();
  }, 10);
  }
}