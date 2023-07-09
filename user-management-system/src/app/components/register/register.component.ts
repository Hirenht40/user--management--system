import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userId: string = '';
  fullName: string = '';
  mobileNo: string = '';
  email: string = '';
  address: string = '';
  qualification: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      if (this.userId) {
        this.fetchUserDetails();
      }
    });
  }
  


  fetchUserDetails() {
    this.http.get<any>(`http://localhost:3000/users/${this.userId}`)
      .subscribe(
        (response) => {
          this.fullName = response.fullName;
          this.mobileNo = response.mobileNo;
          this.email = response.email;
          this.address = response.address;
          this.qualification = response.qualification;
          this.username = response.username;
          this.password = response.password;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  registerOrUpdateUser() {
    const user = {
      fullName: this.fullName,
      mobileNo: this.mobileNo,
      email: this.email,
      address: this.address,
      qualification: this.qualification,
      username: this.username,
      password: this.password
    };

    if (this.userId) {
      // Update existing user
      this.http.put(`http://localhost:3000/users/${this.userId}`, user, { responseType: 'text' })
        .subscribe(
          (response) => {
            if (response === 'Successfully updated') {
              this.toastr.success('User updated successfully!');

              this.router.navigate(['users']);
            } else {
              alert('Error updating user. Please try again.');
            }
          },
          (error) => {
            console.error(error);
            const errormessage = JSON.parse(error.error);
            this.toastr.error(errormessage);
          }
        );
    } else {
      // Register new user
      this.http.post('http://localhost:3000/register', user, { responseType: 'text' })
        .subscribe(
          (response) => {
            if (response === 'Successfully registered') {
              
              this.toastr.success('User registered successfully!');

              this.router.navigate(['login']);
            } else {
              alert('Error registering user. Please try again.');
            }
          },
          (error) => {
            console.error(error);
          const errormessage = JSON.parse(error.error);
          this.toastr.error(errormessage);
          }
        );
    }
  }
}
