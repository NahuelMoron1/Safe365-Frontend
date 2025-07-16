import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SkyModalInstance } from '@skyux/modals';
import { TURN_MODAL_DATA } from '../turns-information.component';

@Component({
  selector: 'app-turn-modal',
  imports: [DatePipe],
  templateUrl: './turn-modal.component.html',
  styleUrl: './turn-modal.component.css',
})
export class TurnModalComponent {
  modal = inject(SkyModalInstance);

  turn = inject(TURN_MODAL_DATA);

  close() {
    this.modal.close();
  }
}
