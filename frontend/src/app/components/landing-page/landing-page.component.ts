import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { Product } from '../../datatypes/product';
import { CartService } from 'src/app/Services/cart.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(
    private productService: ProductServiceService,
    private cartService: CartService,
    private router: Router,
    private userServices: UsersService
    
  ) {}

  public products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log('OnLanding', this.products);
    });
  }

  viewCart() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;

      if (!this.userServices.signIn) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']);
      }
    });
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);

    // if (!this.userServices.signIn) {
    //   this.router.navigate(['/login']);
    // } else {
    //   this.router.navigate(['/register']);
    // }
  }
}
