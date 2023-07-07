import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';


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

  async registerUser() {
    const newUser = {
      fullName: this.fullName,
      mobileNo: this.mobileNo,
      email: this.email,
      address: this.address,
      qualification: this.qualification,
      username: this.username,
      password: this.password
    };
  
    try {
      await axios.post('http://localhost:3000/register', newUser);
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering user. Please try again.');
    }
  }
  
}
