import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentsService } from '../comments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './send-comment.component.html',
  styleUrl: './send-comment.component.scss'
})
export class SendCommentComponent implements OnInit {
  @Input() currentUser: User;
  @Output() add = new EventEmitter<Comment>();

  comment: string;

  ngOnInit(): void {
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
      score: 0,
      user: this.currentUser,
      replies: []
    }

    this.addComment(newComment);
  }

  addComment(newComment: Comment) {
    // this.commentService.createComment(newComment);
    this.add.emit(newComment)
    this.comment = '';
  }


}
