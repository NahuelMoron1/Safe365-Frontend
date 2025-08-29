import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SkyModalModule, SkyModalService } from '@skyux/modals';
import { environment } from '../../../../environments/environment';
import { REVIEWS } from '../../../tokens/token';

@Component({
  selector: 'app-see-full-reviews-modal',
  imports: [CommonModule, SkyModalModule],
  templateUrl: './see-full-reviews-modal.component.html',
  styleUrl: './see-full-reviews-modal.component.css',
})
export class SeeFullReviewsModalComponent {
  public bffUrl?: string = environment.endpoint;
  private instance = inject(SkyModalService);
  public reviews? = inject(REVIEWS);

  returnProfileImage(src: string) {
    return this.bffUrl + src;
  }

  closeModal() {
    this.instance.dispose();
  }
}
