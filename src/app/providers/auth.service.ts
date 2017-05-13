import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AuthService {

  comments: FirebaseListObservable<any[]>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.comments = this.db.list('comments') as FirebaseListObservable<any[]>;
  }

  loginingGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  addComment(comment) {
    return this.comments.push(comment);
  }

}
