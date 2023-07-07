import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fullName: string = '';
  mobileNo: string = '';
  email: string = '';
  address: string = '';
  qualification: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  registerUser() {
    const newUser = {
      fullName: this.fullName,
      mobileNo: this.mobileNo,
      email: this.email,
      address: this.address,
      qualification: this.qualification,
      username: this.username,
      password: this.password
    };
  
    this.http.post('http://localhost:3000/register', newUser)
      .subscribe(
        () => {
          alert('User registered successfully!');
        },
        (error) => {
          console.error(error);
          alert('Error registering user. Please try again.');
        }
      );
  }
  
}
