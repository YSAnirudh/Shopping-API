const Product = require("./models/product");
exports.products = async () => {
    const products = await Product.find();
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id);
    return product;
}
exports.productByPId = async pid => {
    const product = await Product.find({ productId : pid});
    return product;
}
exports.createProduct = async productRequest => {
    const newProduct = await Product.create(productRequest);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}

exports.updateProduct = async (old, productRequest) => {
    const product = await Product.updateOne({productId : old}, 
        {
            $set : {
                productId:productRequest.productId,
                category:productRequest.category,
                productName: productRequest.productName,
                productModel: productRequest.productModel,
                price: productRequest.price,
                availableQuantity:productRequest.availableQuantity
            }   
        });
    return product;
}