'use strict';
module.exports = function(app) {
    var userCartItems = require('../controllers/controller');

    app.route('/rest/v1/users/:user/cart')
        .get(userCartItems.getCartItems);
    app.route('/rest/v1/users/:user/cart')
        .put(userCartItems.putInCart);
    // For adding users.
    app.route('/rest/v1/users/:user')
        .put(userCartItems.putUser);
    app.route('/rest/v1/users')
        .get(userCartItems.getUsers);
};