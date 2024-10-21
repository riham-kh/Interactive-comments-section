import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import { ToAgoPipe } from '../Helpers/Pipes/to-ago.pipe';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ToAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment | Reply;
  @Input() currentUser: User;

  constructor() { }

  ngOnInit(): void {
  }


}
