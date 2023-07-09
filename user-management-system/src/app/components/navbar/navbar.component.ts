import { Component, OnInit ,ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout(): void {
    this.authService.logout();
    this.toastr.success('Logged out!');

  }
}
