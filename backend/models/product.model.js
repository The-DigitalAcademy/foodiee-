module.exports = mongoose => {

    const Product = mongoose.Schema(
        {
            title: String,
            price: Number,
            category: String,
            description: String,
            image: String,
            noOfItems: { type: Number, default: 0 },
            rating: {
                rate: Number,
                count: Number
            }
        },
        { timestamps: true }
    )

    Product.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Products = mongoose.model('products', Product);
    return Products;

};