import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-doctor',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './search-doctor.component.html',
  styleUrl: './search-doctor.component.css',
})
export class SearchDoctorComponent implements OnInit {
  @Input()
  public user?: User;

  private userService = inject(UserService);
  public activeAttendants?: User[];
  public searchTerm = '';
  public filteredUsers?: User[];

  ngOnInit(): void {
    this.userService.getBehaviorSubjectForSearch().subscribe((users) => {
      this.activeAttendants = users;
    });
  }

  onInputSearch() {
    if (this.searchTerm !== '') {
      this.filteredUsers = this.activeAttendants?.filter((u) =>
        u.fullName.toLowerCase().includes(this.searchTerm)
      );
    } else {
      this.filteredUsers = [];
    }
  }

  selectUser(user: User) {
    this.filteredUsers = [];
    this.filteredUsers.push(user);
    this.userService.selectUserSearched(this.filteredUsers);
    this.filteredUsers = [];
    this.searchTerm = '';
  }
}
