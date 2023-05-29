// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsersService } from 'src/app/Services/users.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {
// registered:boolean = false;
// email: string;
// username: string;
// form: FormGroup;



//   constructor(private fb: FormBuilder, private userService: UsersService, private http: HttpClient) {
    
//     this.form = this.fb.group({
//       firstName: ['', [Validators.required, Validators.minLength(3)]],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       cellNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', Validators.required]
//     }, { validators: this.passwordMatchValidator.bind(this) }
    
//     );


    
//   }

//   ngOnInit(): void {
//     // Initialization code here
//   }

//   submitForm() {
//     if (this.form.valid) {
//       this.userService.createUser(this.form.value);
//       console.log(this.form.value);
//       this.registered = true;
    
//       // You can send the form data to a server or perform any other action you need
//     }
//   }

//   passwordMatchValidator(form: FormGroup) {
//     const password = form.get('password');
//     const confirmPassword = form.get('confirmPassword');
//     if (password.value !== confirmPassword.value) {
//       confirmPassword.setErrors({ mismatch: true });
//     } else {
//       confirmPassword.setErrors(null);
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsersService } from 'src/app/Services/users.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {
// registered:boolean = false;
//   form: FormGroup;
//   result: string;
//   isFailed: boolean = false

//   constructor(
//     private fb: FormBuilder, 
//     private userService: UsersService,
//     private httpclient: HttpClient 
//     ) 
    
//     {
//     this.form = this.fb.group({
//       firstName: ['', [Validators.required, Validators.minLength(3)]],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       cellNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', Validators.required]
//     }, { validators: this.passwordMatchValidator.bind(this) });
//   }
  
//   ngOnInit(): void {}
//     // Initialization code here
//     passwordMatchValidator(form: FormGroup) {
//       const password = form.get('password');
//       const confirmPassword = form.get('confirmPassword');
//       if (password.value !== confirmPassword.value) {
//         confirmPassword.setErrors({ mismatch: true });
//       } else {
//         confirmPassword.setErrors(null);
//       }
//     }
  
  
  
//   submitForm() {
//     if (this.form.valid) {
//       const email = this.form.value.email;
//       this.httpclient.post<any>('http://localhost:3033/api/users', { email }).subscribe(
//         response => {
//           this.result = response.message;
//           this.isFailed = false
//           this.registered = true
           
//         },
//         error => {
//           this.result = error.message;
//           this.isFailed =true
//           this.registered = false
          
//         }
//         );
//         this.userService.createUser(this.form.value);
//     }
//       console.log(this.form.value);
//       // You can send the form data to a server or perform any other action you need
//     }
    
//   }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registered: boolean = false;
  form: FormGroup;
  result: string;
  isFailed: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private userService: UsersService,
    private httpClient: HttpClient 
  ) {
    // Initializing the form using FormBuilder
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  ngOnInit(): void {
    // Initialization code here
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  // submitForm() {
  //   if (this.form.valid) {
  //     const email = this.form.value.email;
  //     this.httpClient.post<any>('http://localhost:3033/api/users', { email }).subscribe(
  //       response => {
  //         this.result = response.message;
  //        this.isFailed = false;
  //         this.registered = true;
  //       },
  //       error => {
  //         this.result = error.message;
  //         this.isFailed = true;
  //         this.registered = false;
  //       }
  //     );
  //     this.userService.createUser(this.form.value);
  //   }
  //   console.log(this.form.value);
  //   // You can send the form data to a server or perform any other action you need
  // }

  submitForm() {
    if (this.form.valid) {
      const email = this.form.value.email;
  
      // Check if the user is already registered
      this.httpClient.get<any>('http://localhost:3033/api/users', { params: { email: email } }).subscribe(
        response => {
          if (response.exists) {
            this.result = 'User already registered.';
            this.isFailed = true;
            this.registered = false;
          } else {
            // User is not registered, proceed with registration
            this.userService.createUser(this.form.value).subscribe(
              registrationResponse => {
                this.result = 'User registered successfully.';
                this.isFailed = true;
                this.registered = true;
              },
              error => {
                this.result = 'Failed to register user.';
                this.isFailed = true;
                this.registered = false;
              }
            );
          }
        },
        error => {
          this.result = 'Failed to check user registration.';
          this.isFailed = true;
          this.registered = false;
        }
      );
    }
  
    console.log(this.form.value);
    // You can send the form data to a server or perform any other action you need
  }
  
}




