import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FoodieProductsURL, FoodieeUrl } from '../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UsersService } from '../Services/users.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  url: string = FoodieProductsURL;
  headers: any = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = { headers: this.headers };

  constructor(
    public jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient,
    private userServices: UsersService
  ) {}

  // public isAuthenticated(): boolean {
  //     const token = localStorage.getItem('token');

  //     const isExpired = this.jwtHelper.isTokenExpired(token);

  //     if (!isExpired) {
  //         this.router.navigate(['/products']);
  //         alert('Logged In')
  //     } else {
  //         alert('Token is expired, Access denied!')
  //     }
  //     return !this.jwtHelper.isTokenExpired(token);
  // }

  // public isAuthenticated(): boolean {
  //     const token = localStorage.getItem('token');
  //     const isExpired = this.jwtHelper.isTokenExpired(token);

  //     if (!isExpired) {
  //         this.router.navigate(['/products']);
  //         alert('Logged In');
  //         return true;
  //     } else {
  //         alert('Token is expired, Access denied!');
  //         this.router.navigate(['login']);
  //         return false;
  //     }
  // }

  // canActivate(): boolean {
  //     if (!this.isAuthenticated()) {
  //         this.router.navigate(['login']);
  //         return false;
  //     }
  //     return true;
  // }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      alert('Logged In');
      return true;
    } else {
      this.router.navigate(['login']);
      alert('Token is expired, Access denied!');
      return false;
    }
  }

//   isAuthenticated() {
//     if (!this.userServices.signIn) {
//       this.router.navigate(['/login']);
//     }
//   }
}
