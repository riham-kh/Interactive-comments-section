import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentComponent } from "./comment/comment.component";
import { CommentsService } from "./comments.service";
import { Comment } from './models/comment';
import { Reply } from './models/reply';
import { User } from './models/user';
import { SendCommentComponent } from './send-comment/send-comment.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentComponent, SendCommentComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CommentsService]
})

export class AppComponent implements OnInit {

  comments: Comment[];
  currentUser: User;

  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    this.getCurrenrUser();
    this.getAllComments();
  }

  title = 'my-app';


  getAllComments() {
    this.comments = this.commentService.getComments();
  }

  getCurrenrUser() {
    this.currentUser = this.commentService.getUser();
  }

  addComment(comment: Comment) {
    this.commentService.createComment(comment);
  }

}

