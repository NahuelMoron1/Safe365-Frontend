import { Component, inject } from '@angular/core';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';

@Component({
  selector: 'app-cancel-turn-modal',
  imports: [SkyModalModule],
  templateUrl: './cancel-turn-modal.component.html',
  styleUrl: './cancel-turn-modal.component.css',
})
export class CancelTurnModalComponent {
  private instance = inject(SkyModalInstance);

  confirm() {
    this.instance.close('ok');
  }

  cancel() {
    this.instance.close('cancel');
  }
}
