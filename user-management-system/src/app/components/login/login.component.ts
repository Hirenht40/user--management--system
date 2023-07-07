import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/login', credentials)
      .subscribe(
        () => {
          alert('Logged in successfully!');
        },
        (error) => {
          console.error(error);
          alert('Login failed. Please try again.');
        }
      );
  }
}
