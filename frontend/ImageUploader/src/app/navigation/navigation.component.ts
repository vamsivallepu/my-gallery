import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  // To track the user authentication status
  authenticated = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // Subscribe to the authentication status observable from AuthService
    this.authService.getAuthenticatedStatus().subscribe((authenticated) => {
      this.authenticated = authenticated;
    });

    // Subscribe to router events to trigger authentication check on navigation end
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authService.checkAuthentication();
      }
    });
  }

  // Method to handle user logout
  logout(): void {

    // POST request to the logout API endpoint
    this.http
      .post('http://localhost:8000/api/logout/', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
      });
  }
}
