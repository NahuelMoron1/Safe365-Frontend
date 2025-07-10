import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-search-doctor',
  standalone: true,
  imports: [],
  templateUrl: './search-doctor.component.html',
  styleUrl: './search-doctor.component.css',
})
export class SearchDoctorComponent implements OnInit {
  @Input()
  public user?: User;

  private userService = inject(UserService);
  public activeAttendants: User[] = [];

  ngOnInit(): void {
    console.log('USER: ', this.user);
  }
}
