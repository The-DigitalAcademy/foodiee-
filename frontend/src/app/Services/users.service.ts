import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../datatypes/user';
import { FoodieeUrl } from '../environment';
import { UserLogin } from '../datatypes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  url: string = FoodieeUrl;
  headers: any = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(user: User) {
    // this.http.post(`${this.url}`, user, this.options).subscribe(data => {
    //   console.log(data)
    return this.http.post('http://localhost:3033/api/users', user);
  }

  // signIn(userLogin: UserLogin) {
  //   this.http.post<UserLogin>(`${this.url}/sign`, userLogin, this.options).subscribe(data => {
  //     console.log(data)
  //     const token = data.accessToken;
  //     console.log(token)
  //     console.log("token" + token)
  //     localStorage.setItem('token', token);
  //     if (userLogin.password === data.password) {
  //       this.router.navigate(['/products'])
  //     }
  //   })
  // }

  signIn(userLogin: UserLogin) {
    this.http.post<any>(`${this.url}/sign`, userLogin, this.options).subscribe(data => {
      console.log(data);

      const accessToken = data.accessToken;

      localStorage.setItem('token', accessToken);

      if (userLogin.password === data.password) {
        this.router.navigate(['/products']);
        alert('Working')
      }
    });
  }
}