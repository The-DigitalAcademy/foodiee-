import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { Product } from 'src/app/datatypes/product';
import { CartService } from 'src/app/Services/cart.service';
import { SpecialsService } from 'src/app/Services/specials.service';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent {
  public length: any;
  title: string;
  description: string;
  role: Number;
  public selectedindex: number = 0;
  public images = ['https://cff2.earth.com/uploads/2017/08/09184908/Online-food-shopping-found-to-make-healthy-decisions-easier.jpg', 'https://images.ctfassets.net/lufu0clouua1/1fP5K0BIp8602ypZxr3q7C/1eb3b32ec5fc6a62ea14f0998e6bee9b/Breakfast_9093_rfr.jpg', 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80', 'https://img.foodlogistics.com/files/base/acbm/fl/image/2020/02/Stock_grocery_delivery.5e596df98b675.png?auto=format%2Ccompress&fit=max&q=70&w=1200'];
  products: Product[] = [];
  selectImage(index: number) {
    console.log("Index: " + index);
    this.selectedindex = index;
    console.log("Selected Index: " + this.selectedindex);
  }

  constructor(
    private productsService: ProductServiceService,
    private cartService: CartService,
    private specialService: SpecialsService
  ) { }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.length = this.cartService.cartItemList.length;
    console.log(this.length)

  }

  public productList: Product[] = [];

  ngOnInit(): void {
    this.specialService.reducePrice();
    this.productsService.getProducts().subscribe((data: Product[]) => {
      // Apply discount to products
      const discountedProducts = data.filter((product: Product) => {
        console.log("Current product: ", product);
        return (Number(product.price) > 50 && Number(product.price) < 70) || Number(product.price) > 100;

      }).map((product: Product) => {
        const discountedPrice = Number(product.price) * 0.9;
        return { ...product, price: discountedPrice };
      });

      // Assign modified products to productList
      this.productList = discountedProducts.map((product: Product) => {
        return { ...product, quantity: 1, total: product.price };
      });
    });
  }




}
