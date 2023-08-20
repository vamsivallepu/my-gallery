import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Create a BehaviorSubject to track authentication status with an initial value of false
  public authenticatedSubject = new BehaviorSubject<boolean>(false);

  // Create an observable that emits the authentication status changes
  public authenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient) {

    // Check the authentication status when the application loads
    this.checkAuthentication();
  }

  // To check the authentication status by sending a request to the server
  public checkAuthentication() {
    this.http
      .get('http://localhost:8000/api/user/', { withCredentials: true }) // GET request to the /api/user/ endpoint
      .subscribe(
        (response: any) => {
          this.authenticatedSubject.next(true); // Update the authentication status to true if the request is successful
        },
        (error: any) => {
          this.authenticatedSubject.next(false); // Update the authentication status to false if the request is unsuccessful
        }
      );
  }

  // To get the authentication status as an observable
  getAuthenticatedStatus(): Observable<boolean> {

    // Return the observable that emits authentication status changes
    return this.authenticated$;
  }
}
