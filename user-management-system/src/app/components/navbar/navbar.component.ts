import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is already logged in
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    // Clear the token from local storage and update isLoggedIn status
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
