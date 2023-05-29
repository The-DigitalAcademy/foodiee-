import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/Services/cart.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products: any = [];
  total: number = 0;
  grandTotal: any;
  send: boolean = false;
  form: FormGroup;
  emailSent: boolean = false;

  constructor(private cartService: CartService, private productService: ProductServiceService, private fb: FormBuilder, private route: Router) {

  // constructor(
  //   private cartService: CartService,
  //   private productService: ProductServiceService,
  //   private fb: FormBuilder
  // ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

   cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

  ngOnInit(): void {
    this.products = this.cartService.getProducts()
    this.calculateGrandTotal();
  }

  calculateGrandTotal(): void {
    this.total = 0; // Reset the total before calculating the new grand total
    this.cartService.cartItemList.forEach((item) => {
      this.total += item.price * item.quantity; // Calculate the subtotal for each item
    });
    this.grandTotal = this.total; // Assign the grand total
  }


  removeItem(item: any, index: number) {
    this.total -= this.cartService.cartItemList[index].price;
    this.cartService.removeCartItem(index);
    this.products.splice(index,1)
  }

  emptyCart() {
    this.products = this.cartService.removeAllCart();
    this.route.navigate['/cart'];
    
  }

}
