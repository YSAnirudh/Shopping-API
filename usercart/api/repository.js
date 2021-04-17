const UserCart = require("./models/usercart");
const Product = require("./models/product");
exports.getUser = async function (uuid) {
    const user = await UserCart.find({uuid : uuid})
    return user[0].cart;
};
exports.updateItem = async function (uuid, cartData) {
    const newItem = await UserCart.updateOne({uuid : uuid}, {uuid : cartData.uuid, cart : cartData.cart});
    return newItem
}
exports.addItem = async function (cartData) {
    const newItem = await UserCart.create(cartData);
    return newItem
}
exports.getProductByPId = async function (productId) {
    const product = await Product.find({ productId : productId });
    return product[0];
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