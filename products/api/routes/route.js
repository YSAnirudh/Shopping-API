'use strict';
module.exports = function(app) {
    var productList = require('../controllers/controller');

    app.route('/rest/v1/products')
        .get(productList.getProducts)
    // For creating a product
        .post(productList.createProduct);
    // For updating a product.
    app.route('/rest/v1/products/update')
        .post(productList.updateProducts)
};  