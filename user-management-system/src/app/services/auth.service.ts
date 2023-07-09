import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated); // Emit the updated authentication status
    return isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false); // Emit the updated authentication status
    this.router.navigate(['/login']);
  }
}
