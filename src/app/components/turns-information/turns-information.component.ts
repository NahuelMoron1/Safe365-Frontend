import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { SkyModalService } from '@skyux/modals';
import { TurnModalComponent } from '../../modals/turn-modal/turn-modal.component';
import { Turn } from '../../models/Turn';
import { User } from '../../models/User';
import { UserRole } from '../../models/enums/UserRole';
import { TurnService } from '../../services/turn.service';

import { InjectionToken } from '@angular/core';
export const TURN_MODAL_DATA = new InjectionToken<Turn>('TURN_MODAL_DATA');
export const USER_MODAL_DATA = new InjectionToken<User>('TURN_MODAL_DATA');

@Component({
  selector: 'app-turns-information',
  imports: [NgFor, DatePipe, NgIf],
  templateUrl: './turns-information.component.html',
  styleUrl: './turns-information.component.css',
})
export class TurnsInformationComponent implements OnInit {
  @Input()
  public user?: User;

  private turnsService = inject(TurnService);
  private modalService = inject(SkyModalService);

  public scheduledTurns?: Turn[];
  public completedTurns?: Turn[];
  public canceledTurns?: Turn[];

  public attendantFilter?: string;

  async ngOnInit(): Promise<void> {
    await this.assignTurns();
  }

  async assignTurns() {
    if (!this.user) {
      window.location.href = '';
    }

    if (this.user?.role === UserRole.ATTENDANT) {
      await this.getAllAttendantTurns();
    } else if (this.user?.role === UserRole.CLIENT) {
      await this.getAllUserTurns();
    } else {
      await this.getAllAdminTurns();
    }
  }

  openTurnModal(turn: Turn) {
    this.modalService.open(TurnModalComponent, {
      providers: [
        { provide: TURN_MODAL_DATA, useValue: turn },
        { provide: USER_MODAL_DATA, useValue: this.user },
      ],
    });
  }

  async getAllUserTurns() {
    this.scheduledTurns = await this.turnsService.getScheduledUserTurnsTC();
    this.completedTurns = await this.turnsService.getCompletedUserTurnsTC();
    this.canceledTurns = await this.turnsService.getCanceledUserTurnsTC();
  }

  async getAllAttendantTurns() {
    this.scheduledTurns =
      await this.turnsService.getScheduledAttendantTurnsTC();

    this.completedTurns =
      await this.turnsService.getCompletedAttendantTurnsTC();

    this.canceledTurns = await this.turnsService.getCanceledAttendantTurnsTC();
  }

  async getAllAdminTurns() {
    this.scheduledTurns = await this.turnsService.getScheduledAdminTurnsTC();
    this.completedTurns = await this.turnsService.getCompletedAdminTurnsTC();
    this.canceledTurns = await this.turnsService.getCanceledAdminTurnsTC();
  }
}
