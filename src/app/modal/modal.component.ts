import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() showModal = false;
  @Output() deleteComment: EventEmitter<any> = new EventEmitter();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  onDeleteConfirmation() {
    this.deleteComment.emit(true);
  }

  onDeleteCancel() {
    this.closeModal.emit(true);
  }



}
