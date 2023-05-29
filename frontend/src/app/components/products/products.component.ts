import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/datatypes/product';
import { CartService } from 'src/app/Services/cart.service';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product?: Product
  title: string;
  description: string;
  role: Number;
  public selectedindex: number = 0;
  public images = ['https://images.ctfassets.net/lufu0clouua1/1fP5K0BIp8602ypZxr3q7C/1eb3b32ec5fc6a62ea14f0998e6bee9b/Breakfast_9093_rfr.jpg', 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'];
  products: Product[] = [];

  // showSlides() {
  //   let i: number;
  //   let slides = document.getElementsByClassName("mySlides");
  //   let dots = document.getElementsByClassName("dot");
  //   for (i = 0; i < slides.length; i++) {
  //     (<HTMLElement>slides[i]).style.display = "none";
  //   }
  //   this.selectedindex++;
  //   if (this.selectedindex > slides.length) { this.selectedindex = 1 }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   (<HTMLElement>slides[this.selectedindex - 1]).style.display = "block";
  //   dots[this.selectedindex - 1].className += " active";
  //   setTimeout(() => this.showSlides(), 2000);
  // }


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, private productService: ProductServiceService, private cartService: CartService) {
  }

  AddtoCart(product: any) {
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)

      this.products = this.products.map((product: Product) => {
        return { ...product, quantity: 1, total: product.price }
      })
    })

    // this.productService.loadCart()
    // this.products = this.productService.getProducts();
  }

}