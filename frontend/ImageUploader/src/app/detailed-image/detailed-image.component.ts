import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detailed-image',
  templateUrl: './detailed-image.component.html',
  styleUrls: ['./detailed-image.component.css'],
})
export class DetailedImageComponent implements OnInit {
  // To hold the image id
  id = '';

  // To track if the image is found
  found: boolean = true;

  // To track the authentication status
  logged_in: boolean = false;

  // To hold the image details
  details = {
    title: '',
    description: '',
    image: '',
  };

  constructor(
    private http: HttpClient,
    private params: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // Subscribe to the authentication status observable from the AuthService
    this.authService.getAuthenticatedStatus().subscribe((authenticated) => {
      this.logged_in = authenticated;
    });

    // Extract the image id from the route parameters
    this.id = this.params.snapshot.paramMap.get('id') || '';

    // GET request to get the image details if the image id is present
    if (this.id) {
      this.http
        .get('http://localhost:8000/api/gallery/' + this.id, {
          withCredentials: true,
        })
        .subscribe(
          (response: any) => {

            // Update the details object
            this.details['title'] = response['title'];
            this.details['description'] = response['description'];
            this.details['image'] = 'http://localhost:8000' + response['image'];
          },
          (error: any) => {

            // If the image is not found, set the found flag to false
            this.found = false;
          }
        );
    }
  }

  // Method to handle image deletion
  deleteImage(): void {

    // DELETE request to the server API endpoint
    this.http
      .delete('http://localhost:8000/api/gallery/' + this.id + '/delete/', {
        withCredentials: true,
      })
      .subscribe((response: any) => {
        // Snack bar to show the success message
        this.snackBar.open('Image deleted successfully', 'Dismiss', {
          duration: 3000,
          verticalPosition: 'bottom',
        });

        // Navigate to home page upon successful deletion
        this.router.navigate(['/']);
      });
  }
}
