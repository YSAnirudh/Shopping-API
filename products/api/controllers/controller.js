mongoose = require('mongoose');
const productRepository = require('../repository');

exports.createProduct = async (req, res) => {
    try {
        //if product already present don't insert
        let prod = await productRepository.productByPId(req.body.productId);
        if (prod.length != 0) {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(400)
            .json({
                status :false,
                error:"productId already present"
            });
        }
        let productRequest = {
            productId:req.body.productId,
            category:req.body.category,
            productName: req.body.productName,
            productModel: req.body.productModel,
            price: req.body.price,
            availableQuantity:req.body.availableQuantity
        }
        //else create the product
        let product = await productRepository.createProduct({
            ...productRequest
        });
        return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        return res
        .setHeader('Content-Type', 'application/json')
        .status(500)
        .json({
            error: err,
            status: false,
        })
    }
}

// get all the products
exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        return res
        .setHeader('Content-Type', 'application/json')    
        .status(500)
        .json({
            error: err,
            status: false,
        })
    }
}

// update the existing product
exports.updateProducts = async (req, res) => {
    try {
        let prod = await productRepository.productByPId(req.body.productId);
        if (prod.length == 0) {
            return res
            .setHeader('Content-Type', 'application/json')
            .status(400)
            .json({
                status :false,
                error:"productId not present, cannot update"
            })
        }
        let productRequest = {
            productId:req.body.productId,
            category:req.body.category,
            productName: req.body.productName,
            productModel: req.body.productModel,
            price: req.body.price,
            availableQuantity:req.body.availableQuantity
        }
        
        let product = await productRepository.updateProduct(
            req.body.productId,
            {
                ...productRequest
            }
        );
        return res
        .setHeader('Content-Type', 'application/json')
        .status(200)
        .json({
            status: true,
            data: product,
        })
    } catch (err) {
        return res
        .setHeader('Content-Type', 'application/json')
        .status(500)
        .json({
            error: err,
            status: false,
        })
    }
}