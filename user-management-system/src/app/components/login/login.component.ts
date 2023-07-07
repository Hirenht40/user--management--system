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

    this.http.post<any>('http://localhost:3000/login', credentials)
      .subscribe(
        (response) => {
          // Retrieve the token from the response
          const token = response.token;

          // Save the token in localStorage
          localStorage.setItem('token', token);

          alert('Logged in successfully!');
        },
        (error) => {
          console.error(error);
          alert('Login failed. Please try again.');
        }
      );
  }
}
