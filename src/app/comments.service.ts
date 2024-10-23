import { Injectable } from '@angular/core';
import * as commentsData from '../assets/data/data.json';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private commentsStorageName = "comments";
  private userStorageName = "user";

  private comments: any[];
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

  createComment(newComment: any, id?: any) {
    if (id) {
      let comment = this.findComment(id);
      let commentIndex = this.findCommentIndex(comment);
      this.comments[commentIndex].replies.push(newComment);

    } else {
      this.comments.push(newComment);
    }

    this.updateStorage();
  }

  updateComment(newComment: any) {
    let commentId = this.findCommentIndex(newComment);
    this.comments[commentId] = newComment;
    this.updateStorage();
  }

  deleteComment(comment: any) {

    if (comment.replyingTo) {
      let mainComment = this.findComment(comment.parentId);
      let commentIndex = this.findCommentIndex(mainComment);
      let commentRepliesArr = this.comments[commentIndex].replies;
      commentRepliesArr.splice(commentIndex, 1);

      this.comments[commentIndex].replies = commentRepliesArr;
    } else {
      let commentId = this.findCommentIndex(comment);
      this.comments.splice(commentId, 1);
    }


    this.updateStorage();
  }


  // update storage after operation
  private updateStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(this.commentsStorageName, JSON.stringify(this.comments))
    }
    return this.getComments();
  }

  private findCommentIndex(comment: any) {
    return this.comments.indexOf(comment);
  }

  private findComment(id: any) {
    return this.comments.filter(comment => { return comment.id === id })[0];
  }
}
