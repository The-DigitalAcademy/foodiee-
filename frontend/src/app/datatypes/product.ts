export interface Product {
    id:Number,
    title: String,
    price: Number,
    category: String,
    description: String,
    image: String,
    noOfItems: Number,
    rating: {
        rate: Number,
        count: Number
    }
}