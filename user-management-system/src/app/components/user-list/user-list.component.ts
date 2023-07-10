import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const apiUrl = 'https://user-management-system-5404.onrender.com';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>(`${apiUrl}/users`)
      .subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  deleteUser(userId: string) {
    this.http.delete(`${apiUrl}/users/${userId}`)
      .subscribe(
        () => {
          // Remove the deleted user from the array
          this.users = this.users.filter(user => user._id !== userId);
          this.toastr.success('User deleted successfully!');
        },
        (error) => {
          if (error.status === 200) {
            // Assuming the API returns status code 200 even for successful deletions
            // Remove the deleted user from the array
            this.users = this.users.filter(user => user._id !== userId);
            this.toastr.success('User deleted successfully!');

          } else {
            console.error(error);
            this.toastr.error('Error deleting user. Please try again.');

          }
        }
      );
  }
  

  updateUser(userId: string) {
    // Navigate to the update user page with the user ID as a parameter
    this.router.navigate(['/register', userId]);
  }

  logout() {
    // Remove JWT token from localStorage or session storage
    localStorage.removeItem('token');

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
