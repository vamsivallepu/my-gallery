import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  // To track the authentication status
  logged_in: boolean = false;

  // To hold the user's name
  name = '';

  // To hold the user images
  images: any = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {}

  ngOnInit(): void {

    // Subscribe to the authentication status observable from the AuthService
    this.authService.getAuthenticatedStatus().subscribe(authenticated => {
      this.logged_in = authenticated;
    });

    // GET request to get user's name
    this.http.get('http://localhost:8000/api/user/', { withCredentials: true }).
    subscribe((response: any) => {
      this.name = response['name'];
    });

    // GET request to get user's images
    this.http
      .get('http://localhost:8000/api/gallery/', { withCredentials: true })
      .subscribe((response: any) => {
        try {
          for (let image of response) {
            image['image'] = 'http://localhost:8000' + image['image'];
            this.images.push(image);
          }
        } catch (error) {}
      });
  }
}
