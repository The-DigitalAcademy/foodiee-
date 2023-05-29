import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

import { AuthGuard } from '../../Services/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private auth: AuthGuard
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
    // Initialization code here
  }

  submitForm() {
    
    if (this.form.valid) {
      this.userService.signIn(this.form.value);
      // 
      // You can send the form data to a server or perform any other action you need
      if (this.auth.canActivate) {
        this.router.navigate(['/products'])
      } else {
        alert('acess denied')
      }
    }
  }

  passwordMatchValidator(form: FormGroup) {
    //   const password = form.get('password');
    //   const confirmPassword = form.get('confirmPassword');
    //   if (password.value !== confirmPassword.value) {
    //     confirmPassword.setErrors({ mismatch: true });
    //   } else {
    //     confirmPassword.setErrors(null);
    //   }
    // }
  }

}