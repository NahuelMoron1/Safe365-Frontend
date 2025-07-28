import { Component, inject, Inject } from '@angular/core';
import { Review } from '../../models/Review';
import { CommonModule } from '@angular/common';
import { SkyModalModule, SkyModalService } from '@skyux/modals';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-see-full-reviews-modal',
  imports: [CommonModule, SkyModalModule],
  templateUrl: './see-full-reviews-modal.component.html',
  styleUrl: './see-full-reviews-modal.component.css',
})
export class SeeFullReviewsModalComponent {
  public bffUrl?: string = environment.endpoint;
  private instance = inject(SkyModalService);

  constructor(@Inject('REVIEWS') public reviews?: Review[]) {}

  returnProfileImage(src: string) {
    return this.bffUrl + src;
  }

  closeModal() {
    this.instance.dispose();
  }
}
