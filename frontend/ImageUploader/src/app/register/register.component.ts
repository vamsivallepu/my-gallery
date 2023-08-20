import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  // Form to capture user registration data
  form: FormGroup;

  // To hold the field that has an error
  field = '';

  // To hold the error message
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with empty values
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }

  // Method to handle form submission
  submit(): void {

    // Reset the field and error message
    this.field = '';
    this.errorMessage = '';

    // POST request to the registration API endpoint with form data
    this.http
      .post('http://localhost:8000/api/register/', this.form.getRawValue())
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {

          // Extract the field and error message from the API response
          this.field = Object.keys(error.error)[0];
          this.errorMessage = this.field + ' : ' + error.error[this.field][0];
        }
      );
  }
}
