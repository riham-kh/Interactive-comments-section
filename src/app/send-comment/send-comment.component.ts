import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentsService } from '../comments.service';
import { FormsModule } from '@angular/forms';
import { Reply } from '../models/reply';

@Component({
  selector: 'app-send-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './send-comment.component.html',
  styleUrl: './send-comment.component.scss'
})
export class SendCommentComponent implements OnInit {
  @Input() currentUser: User;
  @Input() replyingTo: any;

  comment: string;

  ngOnInit(): void {
    if (this.replyingTo) {
      this.comment = `@${this.replyingTo.user.username} `;
    }
  }

  constructor(private commentService: CommentsService) { }


  handleSendComment() {
    if (this.comment === "" || this.comment == undefined) {
      return;
    }

    let newComment: Comment = {
      id: Number(Date.now()),
      content: this.comment,
      createdAt: new Date().toString(),
      vote: { score: 0, voters: [] },
      user: this.currentUser,
      replies: []
    }

    this.addComment(newComment);
  }

  handleSendReply() {

    if (this.comment === "" || this.comment == undefined) {
      return;
    }

    if (this.replyingTo) {
      let comment_id = this.replyingTo.comment_id ? this.replyingTo.comment_id : this.replyingTo.id;

      let newReply: Reply =
      {
        id: Number(Date.now()),
        parentId: comment_id,
        content: this.comment,
        createdAt: new Date().toString(),
        vote: { score: 0, voters: [] },
        replyingTo: this.replyingTo.user.username,
        user: this.currentUser
      }

      this.addComment(newReply, comment_id);
    }

  }

  addComment(newComment: Comment, comment_id?: any) {
    this.commentService.createComment(newComment, comment_id)
    this.comment = ''; //reset comment value
  }





}
