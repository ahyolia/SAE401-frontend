import { Component } from '@angular/core';
import { User } from '../../services/user/user';


@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [],
  templateUrl: './compte.html',
  styleUrl: './compte.css'
})
export class Compte {
  user: any;

  constructor(private userService: User) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  onEdit() {
    window.location.href = '/account/edit';
  }

  onLogout() {
    this.userService.logout();
  }
}
