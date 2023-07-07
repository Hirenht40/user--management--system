import { Component, OnInit ,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isUserLoggedIn = !!token;
    this.cdr.detectChanges(); // Trigger change detection to update the view
  }

  logout(): void {
    localStorage.removeItem('token');
    this.checkLoginStatus();
    this.router.navigate(['/login']);
  }
}
