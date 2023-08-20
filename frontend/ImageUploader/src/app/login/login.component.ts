import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // Form to capture user login data
  form: FormGroup;

  // To hold the error message
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // Initialize the form with empty values
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  // Method to handle login form submission
  submit(): void {

    // Reset the error message
    this.errorMessage = '';

    // POST request to the login API endpoint with form data
    this.http
      .post('http://localhost:8000/api/login/', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          // Update authentication status upon successful login and navigate to home page
          this.authService.authenticatedSubject.next(true);
          this.router.navigate(['/']);
        },
        (error: any) => {

          // Update the error message baseed on response status codes
          if (error.status == 401) {
            this.errorMessage = 'Incorrect password';
          } else if (error.status == 404) {
            this.errorMessage = 'User Not Found';
          } else {
            this.errorMessage = 'Server Error';
          }
        }
      );
  }
}
