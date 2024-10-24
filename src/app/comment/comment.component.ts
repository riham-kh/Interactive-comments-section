import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import { ToAgoPipe } from '../Helpers/Pipes/to-ago.pipe';
import { CommentsService } from '../comments.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../modal/modal.component";
import { SendCommentComponent } from '../send-comment/send-comment.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ToAgoPipe, FormsModule, ModalComponent, SendCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

  onEditMode = false;
  showDeleteConfirmation = false;

  @Input() comment: Comment | Reply;
  @Input() currentUser: User;

  @Output() reply: EventEmitter<any> = new EventEmitter();

  editedComment = '';
  shouldDeleteComment = false;
  showReplyForm = false;
  voter: any;
  voterIndex: any;
  vote: any;
  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    this.editedComment = this.comment.content;
    this.vote = this.comment.vote;
  }

  editComment() {
    this.onEditMode = true;
  }

  onEditComment() {
    this.comment.content = this.editedComment;
    this.commentService.updateComment(this.comment);
    this.onEditMode = false;
  }

  onCancel() {
    this.onEditMode = false;
  }


  showConfirmationModal() {
    this.showDeleteConfirmation = true;
  }

  shouldDelete($event: any) {
    if ($event === true) {
      this.commentService.deleteComment(this.comment);
    }
  }

  shouldHideModal($event: any) {
    if ($event === true) {
      this.showDeleteConfirmation = false;
    }
  }

  onReply() {
    this.showReplyForm = true;
  }

  onVote(type: 'up' | 'down') {
    this.findVoter(this.currentUser.username);

    const isUpVote = type === 'up';
    const alreadyVoted = isUpVote ? this.voter?.up : this.voter?.down;

    if (alreadyVoted) {
      return;
    }

    this.countVote(type);

    if (!this.voter) {
      this.vote.voters.push(this.voter);
    } else {
      this.vote.voters[this.voterIndex] = this.voter;
    }

    this.comment.vote = this.vote;

    this.commentService.updateComment(this.comment);

  }


  private countVote(voteType: 'up' | 'down') {
    if (voteType === 'up') {
      this.vote.score++;
      this.voter = {
        name: this.currentUser.username,
        up: true,
        down: false,
      };
    } else {
      this.vote.score--;
      this.voter = {
        name: this.currentUser.username,
        up: false,
        down: true,
      };
    }
  }



  private findVoter(name: string) {
    let commentVoters = this.comment.vote.voters;
    this.voterIndex = commentVoters?.findIndex(voter => voter.name === name);
    this.voter = commentVoters ? commentVoters[this.voterIndex] : null;
  }


}
