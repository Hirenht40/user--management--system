import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/users')
      .subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  logout() {
    // Remove JWT token from localStorage or session storage
    localStorage.removeItem('token');

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
