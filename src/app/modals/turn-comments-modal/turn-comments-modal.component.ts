import { Component, Inject, inject, OnInit } from '@angular/core';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turn-comments-modal',
  imports: [FormsModule, SkyModalModule],
  templateUrl: './turn-comments-modal.component.html',
  styleUrl: './turn-comments-modal.component.css',
})
export class TurnCommentsModalComponent {
  public comment: string = '';
  private modal = inject(SkyModalInstance);

  constructor(@Inject('EXISTING_COMMENTS') public existingComments: string) {}

  save() {
    this.modal.close({ data: this.existingComments });
  }

  cancel() {
    this.modal.close({ data: null });
  }
}
