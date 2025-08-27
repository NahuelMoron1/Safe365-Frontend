import { Component, inject } from '@angular/core';
import { SkyModalInstance, SkyModalModule } from '@skyux/modals';

@Component({
  selector: 'app-complete-turn-modal',
  imports: [SkyModalModule],
  templateUrl: './complete-turn-modal.component.html',
  styleUrl: './complete-turn-modal.component.css',
})
export class CompleteTurnModalComponent {
  private instance = inject(SkyModalInstance);

  confirm() {
    this.instance.close('ok');
  }

  cancel() {
    this.instance.close('cancel');
  }
}
