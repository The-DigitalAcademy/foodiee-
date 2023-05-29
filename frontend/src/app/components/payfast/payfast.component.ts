import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/Services/cart.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-payfast',
  templateUrl: './payfast.component.html',
  styleUrls: ['./payfast.component.scss'],
})
export class PayfastComponent {
  cart: any;
  total: number = 0;
  items: any[] = [];
  form: FormGroup;
  length: any;
  sent:boolean = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private userService: UsersService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit() {
    this.cart = this.cartService.cartItemList;

    this.cart.forEach((item) => {
      this.total += item.price * item.quantity;
    });
    this.length = this.cart.length;

    this.cart.forEach((item) => {
      this.items.push(item.title);
    });
  }

  checkout() {
    console.log(this.form.value);
    this.productService.checkout(this.form.value).subscribe(data => {
      if (data) {
        this.sent = true;
      }
    })
  }
}
