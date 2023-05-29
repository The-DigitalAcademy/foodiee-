import { Injectable } from '@angular/core';
import { ProductServiceService } from './product-service.service';
import { CartService } from './cart.service';
import { FoodieProductsURL } from '../environment';
import { Product } from '../datatypes/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialsService {

  productURL: string = FoodieProductsURL;
  public productList: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>(this.productURL);
  }

  reducePrice() {
    this.getProducts().subscribe((products: Product[]) => {
      // Filter products with a price above R100
      const expensiveProducts = products.filter(product => product.price.valueOf() > 100);
  
      // Reduce the price of each expensive product by 10%
      const reducedProducts = expensiveProducts.map(product => {
        const reducedPrice = product.price.valueOf() * 0.9;
        return { ...product, price: reducedPrice };
      });
  
      // Display the reduced products
      reducedProducts.forEach(product => {
        console.log(`Product: ${product.title}, Price: R${product.price}`);
      });
    });
  }

}