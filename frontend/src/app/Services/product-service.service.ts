import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../datatypes/product';
import { FoodieProductsURL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  [x: string]: any;
  productURL: any = FoodieProductsURL;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.productURL);
  }
  checkout(email: any) {
    return this.http.post(`${this.productURL}/checkout`, email);
  }

  filterByPrice(){
    
  }

  
}
