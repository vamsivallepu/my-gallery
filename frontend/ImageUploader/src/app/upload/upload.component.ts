import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  imageFile: File;
  imageTitle: string = '';
  imageDescription: string = '';

  // To track the authentication status
  logged_in: boolean = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to the authentication status observable from the AuthService
    this.authService.getAuthenticatedStatus().subscribe((authenticated) => {
      this.logged_in = authenticated; 
    });
  }

  // To handle the change event of the file input
  handleImageChange(event: any): void {
    this.imageFile = event.target.files[0];
  }

  // Method to upload the image
  uploadImage(): void {

    // Create a FormData object to hold the image and its metadata
    const formData = new FormData();
    formData.append('image', this.imageFile);
    formData.append('title', this.imageTitle);
    formData.append('description', this.imageDescription);

    // POST request to the server to upload the image
    this.http
      .post('http://localhost:8000/api/gallery/create/', formData, {
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {

          // Snackbar to show the success message
          this.snackBar.open('Image Uploaded successfully ✅', 'Cool', {
            duration: 3000,
            verticalPosition: 'bottom',
          });

          // Navigate back to the home page after successful upload
          this.router.navigate(['/']);

          // Reset the error message
          this.errorMessage = '';
        },
        (error) => {
          // error message to show in the html
          this.errorMessage = "Please fill all the fields appropriately";
        }
      );
  }
}
