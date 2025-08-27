import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';
import { EXISTING_COMMENTS } from '../../tokens/token';

@Component({
  selector: 'app-turn-comments-modal',
  imports: [FormsModule, SkyModalModule],
  templateUrl: './turn-comments-modal.component.html',
  styleUrl: './turn-comments-modal.component.css',
})
export class TurnCommentsModalComponent {
  public comment = '';
  public existingComments = inject(EXISTING_COMMENTS);
  private modal = inject(SkyModalInstance);

  save() {
    this.modal.close({ data: this.existingComments });
  }

  cancel() {
    this.modal.close({ data: null });
  }
}
