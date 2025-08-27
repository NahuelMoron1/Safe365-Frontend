import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  SkyConfirmModule,
  SkyModalInstance,
  SkyModalService,
} from '@skyux/modals';
import { SkyToastService, SkyToastType } from '@skyux/toast';
import {
  TURN_MODAL_DATA,
  USER_MODAL_DATA,
} from '../../components/turns-information/turns-information.component';
import { TurnStatus } from '../../models/enums/TurnStatus';
import { UserRole } from '../../models/enums/UserRole';
import { Review } from '../../models/Review';
import { Turn } from '../../models/Turn';
import { User } from '../../models/User';
import { ErrorService } from '../../services/error.service';
import { ReviewService } from '../../services/review.service';
import { TurnService } from '../../services/turn.service';
import { UtilsService } from '../../services/utils.service';
import { ATTENDANT, EXISTING_COMMENTS, REVIEW, USER } from '../../tokens/token';
import { CancelTurnModalComponent } from '../cancel-turn-modal/cancel-turn-modal.component';
import { CompleteTurnModalComponent } from '../complete-turn-modal/complete-turn-modal.component';
import { CreateReviewModalComponent } from '../create-review-modal/create-review-modal.component';
import { TurnCommentsModalComponent } from '../turn-comments-modal/turn-comments-modal.component';

@Component({
  selector: 'app-turn-modal',
  imports: [DatePipe, NgIf, SkyConfirmModule],
  templateUrl: './turn-modal.component.html',
  styleUrl: './turn-modal.component.css',
})
export class TurnModalComponent implements OnInit {
  private modal = inject(SkyModalInstance);
  private turnService = inject(TurnService);
  private instance = inject(SkyModalService);
  private errorService = inject(ErrorService);
  private toastSvc = inject(SkyToastService);
  private reviewService = inject(ReviewService);

  public turn?: Turn = inject(TURN_MODAL_DATA);
  public user?: User = inject(USER_MODAL_DATA);
  public review?: Review;

  async ngOnInit() {
    if (!this.user || !this.user.id || !this.turn?.Attendant) {
      return this.errorService.handleError(
        undefined,
        'Faltan datos de usuario'
      );
    }
    this.review = await this.reviewService.getUserReviewTC(
      this.user.id,
      this.turn.Attendant.id
    );
  }

  close() {
    this.modal.close();
  }

  async openCancelConfirmModal() {
    const modalRef = this.instance.open(CancelTurnModalComponent, {
      providers: [], // si necesitas pasar datos, acá van
      ariaDescribedBy: 'descripcion-modal',
    });

    const result = await modalRef.closed.toPromise();
    if (result?.data === 'ok' && this.turn) {
      try {
        await this.turnService.cancelTurn(this.turn.id).toPromise();
        this.modal.close();
        location.reload();
      } catch (error) {
        this.errorService.handleError(error, 'Error al cancelar');
        this.modal.close();
      }
    }
  }

  async openCompleteConfirmModal() {
    const modalRef = this.instance.open(CompleteTurnModalComponent, {
      providers: [], // si necesitas pasar datos, acá van
      ariaDescribedBy: 'descripcion-modal',
    });

    const result = await modalRef.closed.toPromise();
    if (result?.data === 'ok' && this.turn) {
      try {
        await this.turnService.completeTurn(this.turn.id).toPromise();
        this.modal.close();
        location.reload();
      } catch (error) {
        this.errorService.handleError(error, 'Error al completar');
        this.modal.close();
      }
    }
  }

  async addOrModifyComment() {
    const modalRef = this.instance.open(TurnCommentsModalComponent, {
      ariaDescribedBy: 'descripcion-comentario',
      providers: [
        {
          provide: EXISTING_COMMENTS,
          useValue: this.turn?.comments || '',
        },
      ],
    });

    const result = await modalRef.closed.toPromise();

    if (!this.turn || !result?.data || result.data.data === null) {
      return;
    }
    const comments = result.data.data;
    try {
      await this.turnService
        .addCommentsAdmin(this.turn?.id, comments)
        .toPromise();

      this.modal.close();
      UtilsService.openToast(
        this.toastSvc,
        'Comentarios actualizados, se recargará la pagina para actualizar.',
        SkyToastType.Success
      );
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (error) {
      this.errorService.handleError(error, 'Error agregando comentarios');
      this.modal.close();
    }
  }

  async addReview() {
    if (
      !this.user?.id ||
      !this.turn?.Attendant?.id ||
      (this.user && this.user.role !== UserRole.CLIENT)
    ) {
      return this.errorService.handleError(
        undefined,
        'No tiene los permisos para agregar una review'
      );
    }

    if (this.turn?.status !== TurnStatus.SCHEDULED) {
      return this.errorService.handleError(
        undefined,
        'Debe tener el turno completado con este médico para agregar una review.'
      );
    }

    const modalRef = this.instance.open(CreateReviewModalComponent, {
      providers: [
        {
          provide: USER,
          useValue: this.user,
        },
        {
          provide: ATTENDANT,
          useValue: this.turn?.Attendant,
        },
        {
          provide: REVIEW,
          useValue: this.review,
        },
      ],
    });

    const result = await modalRef.closed.toPromise();

    if (result?.data === 'close') {
      return;
    }

    if (!result || !result.data || result.data !== 'ok') {
      this.instance.dispose();
      return this.errorService.handleError(
        result?.data,
        'Error creando reseña'
      );
    }
    this.instance.dispose();
    return UtilsService.openToast(
      this.toastSvc,
      'Reseñada agregada correctamente',
      SkyToastType.Success
    );
  }
}
