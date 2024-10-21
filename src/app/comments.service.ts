import { Injectable } from '@angular/core';
import * as commentsData from '../assets/data/data.json';
import { Comment } from './models/comment';
import { Reply } from './models/reply';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private commentsStorageName = "comments";
  private userStorageName = "user";

  private comments: Comment[];
  private currentUser: User;

  constructor() {
    let commentsInStorage = null;
    if (typeof window !== 'undefined' && localStorage) { commentsInStorage = localStorage.getItem(this.commentsStorageName); }
    this.comments = commentsInStorage !== null ? JSON.parse(commentsInStorage) : commentsData.comments;
    this.currentUser = commentsData.currentUser;
  }

  // get current user
  getUser() {
    return this.currentUser;
  }

  // get all comments
  getComments() {
    return this.comments;
  }

  createComment(comment: Comment) {
    this.comments.push(comment);
    this.updateStorage();
  }

  // update storage after operation
  private updateStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(this.commentsStorageName, JSON.stringify(this.comments))
    }
    return this.getComments();
  }
}
