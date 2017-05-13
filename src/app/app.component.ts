import { Component, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  user: object;
  userName: string;
  comments: object[];
  manager: boolean = false;
  comment: string;
  date: number;
  imageUrl: string;

  constructor(private authService: AuthService) {
    authService.afAuth.authState.subscribe(user => {
      this.manager = false;
      this.user = user;
      if (user) {
        this.userName = user.displayName;
        if (user.displayName == "Vitaliy Duvalko") {
          this.manager = true;
        }
      }
    });
    authService.db.list('comments').subscribe(comments => {
      this.comments = comments;
    });

    let storageRef = firebase.storage().ref();
    storageRef.child('/manager-face/my-face-1x.png').getDownloadURL().then((url) => {
      this.imageUrl = url;
    }).catch((error) => {
      console.log(error)
    })

  }

  ngOnInit() {
  }

  loginIn() {
    this.authService.loginingGoogle();
  }
  logOut() {
    this.authService.logOut();
  }

  addComment() {

    let comment = {
      content: this.comment,
      answer: this.manager,
      date: Date.now(),
      userName: this.userName
    }

    this.authService.addComment(comment);

    this.comment = '';

  }
}
