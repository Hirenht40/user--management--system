import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

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
  // Redirect to the users page
  this.toastr.success('Logged in successfully!');


  this.router.navigate(['users']);
        },
        (error) => {
          console.error(error);
          // alert(error.error);
          this.toastr.error(error.error);
        }
      );
  }
}
