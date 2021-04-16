mongoose = require('mongoose');
const cartRepository = require('../repository');
const UserCart = require("../models/model");

exports.getCartItems = async function(req, res) {
    const user = await UserCart.find({uuid : req.params.user});
    if (user.length == 0) {
        return res
        .setHeader('Content-Type', 'application/json')
        .status(404)
        .json({
            error: "User not found, So, no Cart."
        })
    } else {
        if (user[0].cart.length == 0) {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(400)
            .json({
                status : true,
                user : req.body.user,
                cart : "Empty"
            });
        }
        return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({
            status : true,
            user : user[0]
        });
    }
};

exports.putInCart = async function (req, res) {
    const productId = req.body.productId;
    const quantity = Number.parseInt(req.body.quantity);
    try {
        // get user if present
        let user = await UserCart.find({uuid : req.params.user});
        //console.log(user);
        let product = await cartRepository.getProductByPId(productId);
        if (!product) {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(404)
            .json({
                error: "Product you are trying to add to cart Not Found in Products"
            })
        }

        // if user not found send the error message
        if (user.length == 0) {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(404)
            .json({
                error: "User Not found"
            })
        }
        userActual = user[0];
        // if the product asked for is available
        if (product.availableQuantity >= quantity) {
            // if the cart is zero, just push the product into the cart
            if (userActual.cart.length == 0) {
                userActual.cart.push({
                    productId : productId,
                    productName : product.productName,
                    quantity : quantity,
                    amount : quantity * product.price
                });
                userActual.save();
            } 
            // if the cart is not empty
            else {
                // check if there is a product with the same product id
                foundUser = userActual.cart.find(p => p.productId == productId);
                // if not push the product into the cart
                if (!foundUser) {
                    userActual.cart.push({
                        productId : productId,
                        productName : product.productName,
                        quantity : quantity,
                        amount : quantity * product.price
                    });
                } 
                // or else update the product at the found index of the existinf product in the cart
                else {
                    foundUserInd = userActual.cart.findIndex(p => p.productId == productId);
                    userActual.cart[foundUserInd].productId = productId;
                    userActual.cart[foundUserInd].quantity += quantity;
                    userActual.cart[foundUserInd].amount += quantity * product.price;
                }
                userActual.save();
            }
            // after adding it to the cart, update the product database with the new available quantity
            productRequest = {
                productId:product.productId,
                productName:product.productName,
                productModel:product.productModel,
                category:product.category,
                price : product.price,
                availableQuantity:product.availableQuantity - quantity,
            }
            const prod = cartRepository.updateProduct(productId, productRequest);
            return res
            .setHeader('Content-Type', 'application/json')
            .status(200)
            .json({
                message:"Successfully updated " + user[0].uuid + "'s cart and product quantity",
                status : true, 
                'user cart' : userActual.cart
            })
        } else {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(200)
            .json({
                error : "Not enough quantity of the Product available. Only " + product.availableQuantity + " left...",
                'the product you want to add' : product,
            });
        }
    } catch (err) {
        console.log(err)
        return res
        .setHeader('Content-Type', 'application/json')
        .status(400)
        .json({
            type: "Invalid",
            msg: "Something Went Wrong",
            err: err
        })
    }
}

exports.putUser = async function (req, res) {
    try {
        const userId = await UserCart.find({uuid : req.params.user});
        if (userId.length != 0) {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(404)
            .json({
                error: "User already present."
            })
        }
        const user = await UserCart.create({uuid : req.params.user, items:[]});
        res.json(user);
    } catch (err) {
        console.log(err)
        res
        .setHeader('Content-Type', 'application/json')
        .status(400)
        .json({
            type: "Invalid",
            msg: "Used ID problem",
            err: err
        })
    }
}

exports.getUsers = async function (req, res) {
    try {
        users = await UserCart.find();
        var a = Array();
        for (var i = 0; i < users.length; i++) {
            a.push(users[i].uuid);
        }
        return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({
            status : true,
            'users with uuid' : a
        })
    } catch (err) {
        console.log(err)
        res
        .setHeader('Content-Type', 'application/json')
        .status(400)
        .json({
            type: "Invalid",
            msg: "Some Error occured",
            err: err
        })
    }
}