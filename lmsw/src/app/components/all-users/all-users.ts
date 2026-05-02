import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-all-users',
  standalone: false,
  templateUrl: './all-users.html',
  styleUrl: './all-users.css',
})
export class AllUsers {

  users: any[] = [];

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // loadUsers() {
  //   this.auth.getUsers().subscribe((res: any) => {

      

  //     this.users = res.map((u: any) => ({
  //       ...u,
       
  //       isBlocked: u.isBlocked ?? u.blocked ?? u.is_blocked ?? false
  //     }));

  //     console.log("FIXED USERS:", this.users);
  //   });
  // }

  loadUsers() {
  this.auth.getUsers().subscribe((res: any) => {
    this.users = res.map((u: any) => ({
      ...u,
      isBlocked: !!u.isBlocked
    }));
  });
}

  // blockUser(id: any) {
  //   this.auth.blockUser(id).subscribe(() => {
  //     this.loadUsers();
  //   });
  // }

  // unblockUser(id: any) {
  //   this.auth.unblockUser(id).subscribe(() => {
  //     this.loadUsers();
  //   });
  // }

  blockUser(id: any) {
  this.auth.blockUser(id).subscribe({
    next: () => {
      const user = this.users.find(u => u.id === id);
      if (user) user.isBlocked = true;
      alert('You are Blocked by admin ')
    }
  });
}

unblockUser(id: any) {
  this.auth.unblockUser(id).subscribe({
    next: () => {
      const user = this.users.find(u => u.id === id);
      if (user) user.isBlocked = false;
      alert('You are Unblocked by admin ')
    }
  });
}

  trackById(index: number, item: any) {
    return item.id;
  }}