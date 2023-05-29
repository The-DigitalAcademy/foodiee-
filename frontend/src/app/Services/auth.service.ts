import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    throw new Error("Method not implemented.");
  }

  constructor(
    public jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('Jwt');
    console.log("Token", + token)
    if (token) {
      this.router.navigate(['products']);
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
}
